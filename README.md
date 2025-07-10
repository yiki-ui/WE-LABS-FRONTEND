WE AI - Frontend Web Interface 🚀

This repository contains the complete frontend code for the WE AI Agriculture Assistant. It provides a futuristic, sci-fi themed user interface for interacting with the AI chatbot, featuring a dynamic animated background, a holographic "Dyson Sphere" element, and a clean, toggleable chat window.

The interface is built with pure HTML, CSS, and Vanilla JavaScript, ensuring it is lightweight and framework-free.

(A screenshot is highly recommended here. You can take one and upload it to your repository.)

![alt text](https://i.ibb.co/L9s3gX1/we-ai-frontend.png)


Caption: The main interface with the trigger button and animated background.
✨ Key Features

    Futuristic & Immersive UI:

        A dynamic, animated canvas background creates a high-tech feel.

        CSS animations for glowing text and a holographic "Dyson Sphere" enhance the sci-fi theme.

    Toggleable Chat Interface: The chat window is neatly hidden and can be toggled on or off with a single click, keeping the main view clean.

    Real-time Chat: Communicates with the backend via WebSockets to send user messages and receive streaming AI responses instantly. (Functionality implemented in chat.js)

    Voice-to-Text Input: Includes a "mic" button that uses the browser's native SpeechRecognition API to allow users to speak their questions instead of typing.

    Simple & Intuitive Controls: Provides clear buttons to send messages, activate voice input, and clear the chat history.

    Framework-Free: Built with standard web technologies (HTML, CSS, JS) for maximum compatibility and performance with no external library dependencies.

🛠️ Tech Stack

    HTML5: For the core structure and content.

    CSS3: For all styling, including Flexbox, Grid, animations, and the futuristic visual theme.

    Vanilla JavaScript: For all client-side logic, including:

        DOM manipulation.

        Event handling.

        WebSocket communication.

        Web Speech API integration for voice input.

📁 Project Structure
Generated code

      
.
├── index.html          # The main HTML file containing the page structure.
├── styles.css          # All CSS styling for the application.
├── chat.js             # Core JavaScript for WebSocket logic and chat functionality.
└── trig-background.js  # JavaScript for rendering the animated canvas background.

    

IGNORE_WHEN_COPYING_START
Use code with caution.
IGNORE_WHEN_COPYING_END

    index.html: The entry point of the application. It defines all the visible elements.

    styles.css: Contains the visual design, animations, and responsive rules. Modify this file to change colors, fonts, or layouts.

    chat.js: The "brain" of the frontend. It handles connecting to the backend WebSocket, sending user messages, and displaying AI responses. This is where you configure the backend URL.

    trig-background.js: A standalone script that generates the trigonometric background animation on the <canvas> element.

🚀 Getting Started

To run this frontend locally and connect it to your backend, follow these steps.
1. Prerequisites

    A modern web browser (like Chrome, Firefox, Edge).

    A code editor (like VS Code).

    The WE AI - Agriculture Assistant Backend must be running.

2. Installation

Clone the repository to your local machine:
Generated bash

      
git clone https://github.com/your-username/your-frontend-repo-name.git
cd your-frontend-repo-name

    

IGNORE_WHEN_COPYING_START
Use code with caution. Bash
IGNORE_WHEN_COPYING_END
3. Configuration (IMPORTANT!)

You must tell the frontend where to find your backend server.

    Open the chat.js file in your code editor.

    Find the variable that defines the WebSocket URL (you will need to add this).

    Change the URL to match the address of your running backend.

Example chat.js configuration:
Generated javascript

      
// chat.js

document.addEventListener("DOMContentLoaded", () => {

  // --- CONFIGURE THIS LINE ---
  // If your backend is running locally on port 8000.
  const BACKEND_WEBSOCKET_URL = "ws://localhost:8000/ws/";
  // -------------------------

  // --- REST OF THE CHAT LOGIC ---
  const sendBtn = document.getElementById("send-btn");
  const chatInput = document.getElementById("chat-input");
  const messagesContainer = document.querySelector(".messages-container");
  
  // ... your WebSocket connection logic will use BACKEND_WEBSOCKET_URL
});

    

IGNORE_WHEN_COPYING_START
Use code with caution. JavaScript
IGNORE_WHEN_COPYING_END
4. Running Locally

The easiest way to run this project is with a simple local server. If you are using VS Code, the Live Server extension is perfect for this.

    Install the Live Server extension in VS Code.

    Right-click the index.html file in the VS Code explorer.

    Select "Open with Live Server".

Your default web browser will open, and you will see the WE AI interface. You can now click the trigger button and start chatting with your backend AI.
🤝 Connecting to the Backend

This frontend is designed to work seamlessly with the WE AI - Agriculture Assistant Backend. Ensure the backend is running before you start the frontend.

The frontend initiates a WebSocket connection and expects the backend to handle conversation management and AI response generation.
