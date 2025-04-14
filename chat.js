// ========================
// WE AI Agriculture Assistant
// Single-File Frontend Solution
// ========================

// DOM Elements
const sendBtn = document.getElementById("send-btn");
const chatInput = document.getElementById("chat-input");
const voiceBtn = document.getElementById("voice-btn");
const clearBtn = document.getElementById("clear-btn");
const messagesContainer = document.querySelector(".messages-container");
const weAiTrigger = document.getElementById("we-ai-trigger");
const chatInterface = document.getElementById("chat-interface");
const dysonSphere = document.querySelector(".dyson-sphere");

// Global Variables
let socket;
let conversationId;
let isTyping = false;

// ========================
// CORE FUNCTIONS
// ========================

// Initialize WebSocket Connection
async function initWebSocket() {
    try {
        // Create new conversation
        const response = await fetch('http://localhost:8000/conversations', {
            method: 'POST'
        });
        const data = await response.json();
        conversationId = data.conversation_id;
        
        // Connect to WebSocket
        socket = new WebSocket(`ws://localhost:8000/ws/${conversationId}`);
        
        socket.onmessage = (event) => {
            if (isTyping) {
                // Append to existing AI message
                const lastMessage = messagesContainer.lastChild;
                lastMessage.innerHTML += formatBoldText(event.data);
            } else {
                // Create new AI message
                addMessage('ai', event.data);
            }
            scrollToBottom();
        };
        
        socket.onclose = () => {
            console.log('Connection closed');
        };
        
    } catch (error) {
        console.error('Connection error:', error);
        addMessage('ai', "Connection error. Please refresh the page.");
    }
}

// Add Message to Chat
function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    // Replace **word** with <strong>word</strong> before inserting
    const formattedText = formatBoldText(text);

    if (sender === 'user') {
        // User messages appear instantly
        messageDiv.innerHTML = formattedText;
    } else {
        // AI messages use typewriter effect
        isTyping = true;
        typeWriter(messageDiv, formattedText, () => {
            isTyping = false;
        });
    }

    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Format Bold Text
function formatBoldText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

// Typewriter Effect
function typeWriter(element, text, onComplete, speed = 20) {
    let i = 0;
    element.innerHTML = "";

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (onComplete) {
            onComplete();
        }
    }
    type();
}

// Scroll to Bottom
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ========================
// UI INTERACTIONS
// ========================

// Toggle Chat Interface
weAiTrigger.addEventListener("click", async () => {
    chatInterface.classList.toggle("hidden");
    chatInterface.classList.toggle("visible");
    
    if (!chatInterface.classList.contains("hidden")) {
        // Initialize connection when chat opens
        await initWebSocket();
        
        // Dyson sphere pulse effect
        dysonSphere.style.transition = "box-shadow 0.5s ease-out";
        dysonSphere.style.boxShadow = "0 0 25px #ffcc00";
        setTimeout(() => {
            dysonSphere.style.boxShadow = "0 0 10px #ffcc00, 0 0 20px #ffcc00";
        }, 500);
        
        setTimeout(() => chatInput.focus(), 100);
    }
});

// Send Message
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message || !socket || socket.readyState !== WebSocket.OPEN) return;
    
    addMessage('user', message);
    chatInput.value = "";
    
    // Show typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("message", "ai");
    typingIndicator.textContent = "...";
    typingIndicator.id = "typing-indicator";
    messagesContainer.appendChild(typingIndicator);
    scrollToBottom();
    
    // Send message
    socket.send(message);
}

// Clear Conversation
async function clearConversation() {
    // Fade out animation
    messagesContainer.style.transition = "opacity 0.3s ease";
    messagesContainer.style.opacity = "0";
    
    setTimeout(async () => {
        messagesContainer.innerHTML = '';
        
        // End current conversation
        if (conversationId) {
            await fetch(`http://localhost:8000/conversations/${conversationId}/end`, {
                method: 'POST'
            });
        }
        
        // Start fresh
        await initWebSocket();
        addMessage("ai", "Welcome to WE AI Agriculture Assistant. How can I help you today?");
        
        // Fade back in
        messagesContainer.style.opacity = "1";
    }, 300);
}

// Voice Recognition
function setupVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        
        voiceBtn.addEventListener('click', () => {
            recognition.start();
            voiceBtn.innerHTML = "🔴";
            voiceBtn.style.background = "linear-gradient(135deg, #ff0000, #cc0000)";
        });
        
        recognition.onresult = (e) => {
            chatInput.value = e.results[0][0].transcript;
            voiceBtn.innerHTML = "🎙️";
            voiceBtn.style.background = "linear-gradient(135deg, #00ffcc, #0066ff)";
        };
        
        recognition.onerror = () => {
            voiceBtn.innerHTML = "🎙️";
            voiceBtn.style.background = "linear-gradient(135deg, #00ffcc, #0066ff)";
        };
    } else {
        voiceBtn.addEventListener('click', () => {
            alert("Voice recognition not supported in your browser");
        });
    }
}

// ========================
// INITIALIZATION
// ========================

// Event Listeners
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());
clearBtn.addEventListener("click", clearConversation);

// Setup voice recognition
setupVoiceRecognition();

// Initial Welcome Message
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!messagesContainer.hasChildNodes()) {
            addMessage("ai", "Welcome to WE AI Agriculture Assistant. How can I help you today?");
        }
    }, 1000);
});
