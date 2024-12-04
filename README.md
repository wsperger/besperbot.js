# BesperBot

**BesperBot** is a simple and efficient JavaScript library designed to seamlessly integrate chatbots available under [b-esper.com](https://b-esper.com) into your web applications. With minimal setup, you can enhance user engagement and provide instant support effortlessly.

## Prerequisites

Before integrating BesperBot, ensure you have the following:

- **Active Besper Bot**: An active bot configured under [b-esper.com](https://b-esper.com).
- **Bot Identifier**: A valid bot ID provided by b-esper.com.

## Installation

### Step 1: Include the Library

Add the `besperbot.bundle.js` script to your HTML file. This script is responsible for initializing and managing the chatbot integration.

```html
<script src="path/to/besperbot.bundle.js"></script>
```

### Step 2: Initialize the Chatbot

Add a container element where the chatbot will be rendered and initialize BesperBot with your bot's ID. Here's a lean and functional example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>BesperBot Integration</title>
    <style>
        /* Optional: Customize the chatbot container */
        #bsp_chatbot-container {
            /* Example custom styles */
            width: 300px;
            height: 500px;
            position: fixed;
            bottom: 20px;
            right: 20px;
            /* Add more custom styles as needed */
        }
    </style>
</head>
<body>
    <!-- Chatbot Container -->
    <div id="bsp_chatbot-container"></div>

    <!-- Required Dependency -->
    <script src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>
    
    <!-- Load BesperBot Library -->
    <script src="path/to/besperbot.bundle.js"></script>

    <!-- Initialize BesperBot -->
    <script>
        window.addEventListener('load', async () => {
            try {
                await window.BesperBot.initSession({
                    id: 'YOUR_BOT_ID_HERE', // Replace with your actual bot ID from b-esper.com
                    containerId: 'bsp_chatbot-container',
                    widget: true // Set to false to embed the chat directly without a widget button
                });
                console.log('BesperBot initialized successfully.');
            } catch (error) {
                console.error('Failed to initialize BesperBot:', error);
            }
        });
    </script>
</body>
</html>
```

**Note**: Replace `'YOUR_BOT_ID_HERE'` with your actual bot ID provided by [b-esper.com](https://b-esper.com).

## Customization

- **Widget Mode**: Toggle between a chatbot widget button or an embedded chat interface by setting the `widget` parameter.

    ```javascript
    window.BesperBot.initSession({
        id: 'YOUR_BOT_ID_HERE',
        containerId: 'bsp_chatbot-container',
        widget: false // Embeds the chat directly without a widget button
    });
    ```

- **Custom CSS**: Apply custom styles to the chatbot container by targeting the `<div id="bsp_chatbot-container"></div>` element. This allows you to adjust the size, position, and appearance to match your website's design.

    ```css
    #bsp_chatbot-container {
        /* Example custom styles */
        width: 400px;
        height: 600px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        /* Add more custom styles as needed */
    }
    ```

All other customizations are managed through [b-esper.com](https://b-esper.com), ensuring a centralized and streamlined configuration process.

## Security Considerations

Ensure the security and integrity of your chatbot integration by adhering to the following best practices:

- **Token Management**: Protect tokens by handling them securely and avoiding public exposure.
- **CORS Policies**: Configure your backend to permit requests only from your trusted frontend domains.
- **HTTPS**: Always utilize HTTPS to encrypt data in transit, safeguarding interactions between clients and your backend.

---

With **BesperBot**, integrating your chatbot from [b-esper.com](https://b-esper.com) into your web applications is straightforward and hassle-free. Customize with ease and maintain a seamless user experience across all your platforms.