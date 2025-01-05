
# BesperBot

**BesperBot** is a simple and efficient JavaScript library designed to seamlessly integrate chatbots available under [b-esper.com](https://b-esper.com) into your web applications. With minimal setup, you can enhance user engagement and provide instant support effortlessly.

## Prerequisites

Before integrating BesperBot, ensure you have the following:

- **Active BesperBot**: An active bot configured under [b-esper.com](https://b-esper.com).
- **Bot Identifier**: A valid bot ID provided by b-esper.com.

## Integration Steps

Follow these steps to integrate BesperBot into your web page:

### Step 1: Set Up the HTML Structure and Load Required Scripts

Create or use an existing HTML file and include the BesperBot and Microsoft Bot Framework Web Chat libraries:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Web Page Title</title>
    
    <!-- Load BesperBot Styles -->
    <link rel="stylesheet" href="https://unpkg.com/besperbot@1.0.4/styles.css">
</head>
<body>
    <!-- Container for the chatbot -->
    <div id="bsp_chatbot-container"></div>

    <!-- Load Microsoft Bot Framework Web Chat -->
    <script src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"></script>

    <!-- Load BesperBot Library -->
    <script src="https://unpkg.com/besperbot@1.0.4/index.js"></script>
</body>
</html>
```

### Step 2: Initialize the Chatbot

Initialize the BesperBot session:

```html
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
```

**Note**: Replace `'YOUR_BOT_ID_HERE'` with your actual `botId` provided by [b-esper.com](https://b-esper.com).

## Customization

- **Widget Mode**: Toggle between a chatbot widget button or an embedded chat interface by setting the `widget` parameter.

    ```javascript
    window.BesperBot.initSession({
        id: 'YOUR_BOT_ID_HERE',
        containerId: 'bsp_chatbot-container',
        widget: false // Embeds the chat directly without a widget button
    });
    ```

- **Custom CSS**: Apply custom styles to the chatbot container by targeting the `<div id="bsp_chatbot-container"></div>` element.

    ```css
    #bsp_chatbot-container {
        width: 400px;
        height: 600px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    ```

All other customizations are managed through [b-esper.com](https://b-esper.com), ensuring a centralized and streamlined configuration process.

## Security Considerations

Ensure the security and integrity of your chatbot integration by adhering to the following:

- **Token Management**: Protect tokens by handling them securely and avoiding public exposure.
- **CORS Policies**: Configure your backend to permit requests only from your trusted frontend domains.
- **HTTPS**: Always utilize HTTPS to encrypt data in transit, safeguarding interactions between clients and your backend.

## Support and Feedback

We are happy to receive issues, bug reports, and feedback:

- **Support Tickets**: Create a support ticket on [b-esper.com](https://b-esper.com).
- **Email**: Contact us at [wolfgangsperger@besperai.com](mailto:wolfgangsperger@besperai.com).

Please note, we do not accept outside contributions but value your feedback for continuous improvement.

---

With **BesperBot**, integrating your chatbot from [b-esper.com](https://b-esper.com) into your web applications is straightforward and hassle-free. Customize with ease and maintain a seamless user experience across all your platforms.