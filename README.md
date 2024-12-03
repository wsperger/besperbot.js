BESPERBOT Library
Overview
Besperbot is a centralized JavaScript library for integrating Azure Bot Framework chatbots into your web applications. It handles chatbot setup, authentication, and styling, allowing for easy customization and maintenance across multiple instances.

Features
Centralized Setup: Manage chatbot configurations from a single library.
Customizable Styles: Separate widget and chat styles via JSON for easy theming.
Azure Bot Framework Integration: Seamlessly integrates with Azure Bots using Direct Line tokens.
Responsive Design: Ensures the chatbot looks great on all devices.
Installation
Include the Library:

Add the besperbot.bundle.js script to your HTML file.

``

<script src="path/to/besperbot.bundle.js"></script>
``

Initialize the Chatbot:

Ensure that your backend API is set up to provide the necessary payload.

Configuration
Besperbot requires a payload from your backend API to initialize the chatbot. This payload should include your bot ID, widget styles, chat styles, and the Direct Line token.

API Endpoint
Your backend should expose an API endpoint at:

https://b-esper-apim.azure-api.net/dev/sessions/initiate

This endpoint should accept a POST request with the following body:

{ "product": "directline-access", "action": "get_directline_access", "data": { "bot-identifier": "YOUR_BOT_ID" } }

Sample Payload
Your backend should respond with a JSON payload structured as follows:

{ "id": "YOUR_BOT_ID", "containerId": "chatbot-container", "widget": true, "token": "YOUR_DIRECT_LINE_TOKEN", "styles": { "widgetStyles": { "widgetBackgroundColor": "#ffffff", "widgetColor": "#000000", "widgetWidth": "60px", "widgetHeight": "60px", "position": "fixed", "bottom": "20px", "right": "20px", "border": "none", "borderRadius": "50%", "cursor": "pointer", "zIndex": "1000", "boxShadow": "0 4px 8px rgba(0, 0, 0, 0.2)" }, "chatStyles": { "width": "400px", "height": "600px", "backgroundColor": "#ffffff", "bubbleBackground": "#f7fafc", "bubbleFromUserBackgroundColor": "#805ad5", "bubbleTextColor": "#1a202c", "bubbleFromUserTextColor": "#ffffff", "bubbleBorderColor": "#edf2f7", "bubbleFromUserBorderColor": "#805ad5", "bubbleBorderRadius": "16px", "bubbleFromUserBorderRadius": "16px", "bubblePadding": "16px", "bubbleFromUserPadding": "16px", "fontSize": "15px", "fontFamily": "'SF Pro Display', -apple-system, sans-serif", "inputBoxFontSize": "15px", "inputBoxFontFamily": "'SF Pro Display', -apple-system, sans-serif", "botAvatarImage": "", "botAvatarInitials": "AI", "userAvatarImage": "", "userAvatarInitials": "U", "botAvatarSize": "36px", "userAvatarSize": "36px", "suggestedActionBackgroundColor": "#805ad5", "suggestedActionTextColor": "#ffffff", "suggestedActionBorderColor": "#805ad5", "suggestedActionBorderRadius": "24px", "suggestedActionPadding": "12px", "timestampFont": "12px SF Pro Display", "timestampColor": "#718096", "sendBoxBackgroundColor": "#f7fafc", "sendBoxBorderColor": "#edf2f7", "sendBoxBorderRadius": "12px", "sendBoxHeight": "48px", "sendBoxTextColor": "#1a202c", "sendBoxPadding": "16px", "rootHeight": "600px", "rootWidth": "100%", "textContentColor": "#1a202c", "textContentFontFamily": "'SF Pro Display', -apple-system, sans-serif", "textContentFontWeight": "400", "hideUploadButton": true, "animationDuration": "0.2s", "messagePadding": "16px" } } }

Usage
Ensure Backend is Running:

Make sure your backend API at https://b-esper-apim.azure-api.net/dev/sessions/initiate is up and properly configured to return the expected payload.

Initialize the Chatbot:

The besperbot.bundle.js will automatically fetch the payload from your backend and render the chatbot widget.

besperbot.bundle.js Overview
The besperbot.bundle.js script handles the following:

Fetching Configuration: Makes an API call to retrieve the chatbot token and styling configurations.
Rendering Widget: Creates and styles the chatbot widget button.
Initializing Chat: Sets up the Azure Bot Web Chat with the provided token and styles.
Handling Toggle: Manages the visibility of the chat window when the widget button is clicked.
Key Functions
initializeChat(container, token, chatStyles)
Initializes the Azure Bot Web Chat within the specified container using the provided token and styles.

applyStyles(widgetButton, chatContainer, widgetStyles, chatStyles)
Applies the given widget and chat styles to the respective elements.

renderWidget(container)
Fetches the payload from the backend and renders the chatbot widget accordingly.

Customization
You can customize the appearance and behavior of the chatbot by modifying the widgetStyles and chatStyles in your backend payload. This allows for centralized management of styles without the need to alter the library for each instance.

Additional Widget Styles
You can add more styles to the widgetStyles object in the payload to further customize the widget appearance. For example:

{ "widgetStyles": { "position": "fixed", "bottom": "20px", "right": "20px", "border": "none", "borderRadius": "50%", "cursor": "pointer", "zIndex": "1000", "boxShadow": "0 4px 8px rgba(0, 0, 0, 0.2)" // Add more styles as needed } }

Error Handling
The library includes basic error handling for failed API calls. Ensure that your backend API provides meaningful error messages to facilitate easier debugging.

Security Considerations
Token Management: Ensure that Direct Line tokens are handled securely and are not exposed publicly.
CORS Policies: Configure your backend to allow requests from your frontend domain.
HTTPS: Always use HTTPS to secure data in transit.