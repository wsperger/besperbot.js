# BesperBot

**BesperBot** is a sophisticated JavaScript library designed to seamlessly integrate chatbots built with the Microsoft Bot Framework into your web applications. Simplify your chatbot deployment with centralized management, customizable styling, and effortless maintenance across multiple instances.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Overview](#overview)
  - [Features](#features)
  - [Steps](#steps)
- [Configuration](#configuration)
  - [API Endpoint](#api-endpoint)
  - [Sample Payload](#sample-payload)
- [Usage](#usage)
  - [Ensure Backend is Running](#ensure-backend-is-running)
  - [Initialize the Chatbot](#initialize-the-chatbot)
- [Library Overview](#library-overview)
  - [Key Functions](#key-functions)
- [Customization](#customization)
  - [Additional Widget Styles](#additional-widget-styles)
- [Error Handling](#error-handling)
- [Security Considerations](#security-considerations)

## Prerequisites

Before integrating BesperBot, ensure you have the following:

- **Microsoft Azure Bot**: A configured and deployed bot on Microsoft Azure.
- **Bot Framework Web Chat**: Enabled support for Bot Framework Web Chat.
- **Bot Identifier**: A valid bot ID obtained from your Azure portal.

## Installation

### Overview

BesperBot centralizes the integration of Azure Bot Framework chatbots into your web applications. It streamlines chatbot setup, handles authentication, and offers extensive styling options, enabling easy customization and maintenance across multiple deployments.

### Features

- **Centralized Configuration**: Manage all chatbot settings from a single library.
- **Customizable Styling**: Tailor widget and chat styles independently using JSON.
- **Seamless Integration**: Connect effortlessly with Azure Bots via Direct Line tokens.
- **Responsive Design**: Ensures optimal appearance across all devices.

### Steps

#### 1. Include the Library

Add the `besperbot.bundle.js` script to your HTML file:

```html
<script src="path/to/besperbot.bundle.js"></script>
```

#### 2. Initialize the Chatbot

Ensure your backend API is configured to provide the necessary payload for chatbot initialization.

## Configuration

BesperBot requires a specific payload from your backend API to set up the chatbot. This payload includes your Bot ID, styling configurations for both the widget and chat interface, and the Direct Line token.

### API Endpoint

Your backend should expose the following API endpoint:

```
https://b-esper-apim.azure-api.net/dev/sessions/initiate
```

Send a `POST` request with the following body to this endpoint:

```json
{
  "product": "directline-access",
  "action": "get_directline_access",
  "data": {
    "bot-identifier": "YOUR_BOT_ID"
  }
}
```

### Sample Payload

The backend should respond with a JSON payload structured as shown below:

```json
{
  "id": "YOUR_BOT_ID",
  "containerId": "chatbot-container",
  "widget": true,
  "token": "YOUR_DIRECT_LINE_TOKEN",
  "styles": {
    "widgetStyles": {
      "widgetBackgroundColor": "#ffffff",
      "widgetColor": "#000000",
      "widgetWidth": "60px",
      "widgetHeight": "60px",
      "position": "fixed",
      "bottom": "20px",
      "right": "20px",
      "border": "none",
      "borderRadius": "50%",
      "cursor": "pointer",
      "zIndex": "1000",
      "boxShadow": "0 4px 8px rgba(0, 0, 0, 0.2)"
    },
    "chatStyles": {
      "width": "400px",
      "height": "600px",
      "backgroundColor": "#ffffff",
      "bubbleBackground": "#f7fafc",
      "bubbleFromUserBackgroundColor": "#805ad5",
      "bubbleTextColor": "#1a202c",
      "bubbleFromUserTextColor": "#ffffff",
      "bubbleBorderColor": "#edf2f7",
      "bubbleFromUserBorderColor": "#805ad5",
      "bubbleBorderRadius": "16px",
      "bubbleFromUserBorderRadius": "16px",
      "bubblePadding": "16px",
      "bubbleFromUserPadding": "16px",
      "fontSize": "15px",
      "fontFamily": "'SF Pro Display', -apple-system, sans-serif",
      "inputBoxFontSize": "15px",
      "inputBoxFontFamily": "'SF Pro Display', -apple-system, sans-serif",
      "botAvatarImage": "",
      "botAvatarInitials": "AI",
      "userAvatarImage": "",
      "userAvatarInitials": "U",
      "botAvatarSize": "36px",
      "userAvatarSize": "36px",
      "suggestedActionBackgroundColor": "#805ad5",
      "suggestedActionTextColor": "#ffffff",
      "suggestedActionBorderColor": "#805ad5",
      "suggestedActionBorderRadius": "24px",
      "suggestedActionPadding": "12px",
      "timestampFont": "12px SF Pro Display",
      "timestampColor": "#718096",
      "sendBoxBackgroundColor": "#f7fafc",
      "sendBoxBorderColor": "#edf2f7",
      "sendBoxBorderRadius": "12px",
      "sendBoxHeight": "48px",
      "sendBoxTextColor": "#1a202c",
      "sendBoxPadding": "16px",
      "rootHeight": "600px",
      "rootWidth": "100%",
      "textContentColor": "#1a202c",
      "textContentFontFamily": "'SF Pro Display', -apple-system, sans-serif",
      "textContentFontWeight": "400",
      "hideUploadButton": true,
      "animationDuration": "0.2s",
      "messagePadding": "16px"
    }
  }
}
```

## Usage

### Ensure Backend is Running

Verify that your backend API at `https://b-esper-apim.azure-api.net/dev/sessions/initiate` is operational and correctly configured to return the expected payload.

### Initialize the Chatbot

Upon inclusion of `besperbot.bundle.js` in your HTML, the script will automatically fetch the payload from your backend and render the chatbot widget accordingly.

## Library Overview

The `besperbot.bundle.js` script encapsulates the following functionalities:

- **Fetching Configuration**: Retrieves the chatbot token and styling configurations via an API call.
- **Rendering Widget**: Creates and styles the chatbot widget button based on provided styles.
- **Initializing Chat**: Sets up the Azure Bot Web Chat with the specified token and styles.
- **Handling Toggle**: Manages the visibility of the chat window when the widget button is interacted with.

### Key Functions

- **`initializeChat(container, token, chatStyles)`**
  - *Description*: Initializes the Azure Bot Web Chat within the specified container using the provided token and styles.
  
- **`applyStyles(widgetButton, chatContainer, widgetStyles, chatStyles)`**
  - *Description*: Applies the defined widget and chat styles to the respective elements.
  
- **`renderWidget(container)`**
  - *Description*: Fetches the payload from the backend and renders the chatbot widget based on the received configurations.

## Customization

Customize the appearance and behavior of your chatbot by modifying the `widgetStyles` and `chatStyles` within your backend payload. This centralized approach allows for consistent theming without the need to alter the library for each instance.

### Additional Widget Styles

Enhance the widget's appearance by adding more styles to the `widgetStyles` object in the payload. For example:

```json
{
  "widgetStyles": {
    "position": "fixed",
    "bottom": "20px",
    "right": "20px",
    "border": "none",
    "borderRadius": "50%",
    "cursor": "pointer",
    "zIndex": "1000",
    "boxShadow": "0 4px 8px rgba(0, 0, 0, 0.2)"
    // Add more styles as needed
  }
}
```

Feel free to expand upon these styles to better match your application's design language.

## Error Handling

BesperBot includes foundational error handling mechanisms for failed API calls. To facilitate easier debugging, ensure that your backend API returns meaningful and descriptive error messages.

