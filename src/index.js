
/**
 * BesperBot - A JavaScript chatbot integration library for Microsoft Bot Framework
 * Version: 1.0.0
 * Dependencies: Microsoft Bot Framework Web Chat
 * 
 * @requires botframework-webchat
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.BesperBot = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    // Create BesperBot instance
    const BesperBot = (function () {
        // Version constant
        const VERSION = '1.0.0';

        // Define the API endpoint
        const API_ENDPOINT = 'https://b-esper-apim.azure-api.net/dev/sessions/initiate';

        /**
         * Check if required dependencies are available
         */
        function checkDependencies() {
            if (typeof window === 'undefined') {
                throw new Error('BesperBot requires a browser environment');
            }

            // Will be checked again when needed, but early warning is helpful
            if (typeof window.WebChat === 'undefined') {
                console.warn('Microsoft Bot Framework Web Chat is not loaded yet. Make sure to include the webchat.js script.');
            }
        }

        // Run dependency check
        checkDependencies();

        /**
         * Initializes the chatbot session.
         * @param {Object} params - Parameters for session initialization.
         * @param {string} params.id - The bot identifier.
         * @param {string} [params.containerId="chatbot-container"] - The ID of the container element.
         * @param {boolean} [params.widget=true] - Flag to render as widget or embedded chat.
         * @throws {Error} If container element is not found or API calls fail.
         */
        async function initSession({ id, containerId = "chatbot-container", widget = true }) {
            console.log('BesperBot.initSession called with parameters:', { id, containerId, widget });

            try {
                // Get the container element
                const container = document.getElementById(containerId);
                if (!container) {
                    throw new Error(`Container with ID "${containerId}" not found.`);
                }

                // Step 1: Call front_end_setup to get widgetStyles and widget flag
                console.log('Calling front_end_setup API...');
                const frontEndData = await callFrontEndSetup(id);
                
                // Apply widget styles immediately
                const widgetStyles = frontEndData.widgetStyles;
                applyStyles(widgetStyles);

                // Determine if we should use widget mode (API response takes precedence)
                const useWidget = typeof frontEndData.widget === 'boolean' ? frontEndData.widget : widget;

                if (useWidget) {
                    console.log('Widget mode enabled. Rendering widget button...');
                    renderWidget(container, id, widgetStyles);
                } else {
                    console.log('Widget mode disabled. Initializing conversation immediately...');
                    const conversationData = await initConversation(id, containerId);
                    renderChat(container, conversationData);
                }
            } catch (error) {
                console.error('Error in initSession:', error);
                throw error;
            }
        }

        /**
         * Calls the front_end_setup API endpoint.
         * @param {string} botId - The bot identifier.
         * @returns {Promise<Object>} The API response data.
         * @throws {Error} If API call fails or returns invalid data.
         */
        async function callFrontEndSetup(botId) {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: 'directline-access',
                    action: 'front_end_setup',
                    data: { 'bot-identifier': botId }
                })
            });

            if (!response.ok) {
                throw new Error(`Front-end setup API error: ${response.status}`);
            }

            const data = await response.json();
            if (!data.success || !data.widgetStyles) {
                throw new Error('Invalid front_end_setup response structure');
            }

            return data;
        }

        /**
         * Initializes the conversation by calling the init_conversation API endpoint.
         * @param {string} botId - The bot identifier.
         * @param {string} containerId - The ID of the container element.
         * @returns {Promise<Object>} The conversation initialization data.
         * @throws {Error} If API call fails or returns invalid data.
         */
        async function initConversation(botId, containerId) {
            console.log('Initializing conversation for bot:', botId);

            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: 'directline-access',
                    action: 'init_conversation',
                    data: { 'bot-identifier': botId }
                })
            });

            if (!response.ok) {
                throw new Error(`Conversation initialization API error: ${response.status}`);
            }

            const data = await response.json();
            if (!data.success || !data.token || !data.chatStyles) {
                throw new Error('Invalid init_conversation response structure');
            }

            return {
                token: data.token,
                chatStyles: data.chatStyles,
                containerId: data.containerId || containerId
            };
        }

        /**
         * Applies styles to the document.
         * @param {Object} widgetStyles - Styles for the widget button and chat container.
         */
        function applyStyles(widgetStyles) {
            let styleTag = document.getElementById('besperbot-styles');
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = 'besperbot-styles';
                document.head.appendChild(styleTag);
            }

            styleTag.innerHTML = `
                .besperbot-chat-container {
                    width: ${widgetStyles.width || '400px'};
                    height: ${widgetStyles.height || '600px'};
                    background-color: ${widgetStyles.backgroundColor || '#ffffff'};
                    border-radius: ${widgetStyles.bubbleBorderRadius || '16px'};
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                    font-family: ${widgetStyles.fontFamily || "'SF Pro Display', -apple-system, sans-serif"};
                    font-size: ${widgetStyles.fontSize || '15px'};
                    color: ${widgetStyles.textContentColor || '#1a202c'};
                    position: fixed;
                    bottom: 90px;
                    right: 20px;
                    display: none;
                    z-index: 1000;
                    overflow: hidden;
                }

                .besperbot-widget-button {
                    width: ${widgetStyles.widgetWidth || '60px'};
                    height: ${widgetStyles.widgetHeight || '60px'};
                    border-radius: 50%;
                    border: none;
                    background-color: ${widgetStyles.widgetBackgroundColor || '#ffffff'};
                    color: ${widgetStyles.widgetColor || '#000000'};
                    font-size: 24px;
                    cursor: pointer;
                    z-index: 1001;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    transition: transform 0.2s ease;
                }

                .besperbot-widget-button:hover {
                    transform: scale(1.05);
                }

                .besperbot-message {
                    padding: ${widgetStyles.messagePadding || '16px'};
                    border-bottom: 1px solid ${widgetStyles.bubbleBorderColor || '#edf2f7'};
                }
            `;
        }

        /**
         * Renders the widget button and chat container.
         * @param {HTMLElement} container - The container element.
         * @param {string} botId - The bot identifier.
         * @param {Object} widgetStyles - Styles for the widget.
         */
        function renderWidget(container, botId, widgetStyles) {
            // Create widget button if it doesn't exist
            let widgetButton = container.querySelector('.besperbot-widget-button');
            if (!widgetButton) {
                widgetButton = document.createElement('button');
                widgetButton.className = 'besperbot-widget-button';
                widgetButton.innerHTML = '&#128172;'; // Chat bubble icon
                container.appendChild(widgetButton);
            }

            // Create chat container if it doesn't exist
            let chatContainer = container.querySelector('.besperbot-chat-container');
            if (!chatContainer) {
                chatContainer = document.createElement('div');
                chatContainer.className = 'besperbot-chat-container';
                container.appendChild(chatContainer);
            }

            // Track chat initialization state
            let chatInitialized = false;

            // Handle widget button clicks
            widgetButton.addEventListener('click', async () => {
                const isVisible = chatContainer.style.display === 'block';
                
                if (!isVisible && !chatInitialized) {
                    try {
                        // Initialize conversation only on first show
                        const conversationData = await initConversation(botId, container.id);
                        renderChat(chatContainer, conversationData);
                        chatInitialized = true;
                    } catch (error) {
                        console.error('Failed to initialize conversation:', error);
                        return;
                    }
                }
                
                // Toggle visibility
                chatContainer.style.display = isVisible ? 'none' : 'block';
                widgetButton.innerHTML = isVisible ? '&#128172;' : '&#10005;'; // Toggle between chat and close icons
            });
        }

        /**
         * Renders the chat interface.
         * @param {HTMLElement} container - The container element.
         * @param {Object} data - The conversation data including token and styles.
         */
        function renderChat(container, data) {
            const { token, chatStyles } = data;
            container.style.display = 'block';
            initializeWebChat(container, token, chatStyles);
        }

        /**
         * Loads the Web Chat script if not already loaded.
         * @param {Function} callback - Callback to execute when script is loaded.
         */
        function loadWebChatScript(callback) {
            if (window.WebChat) {
                callback();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';
            script.async = true;
            script.onload = callback;
            script.onerror = () => console.error('Failed to load WebChat script');
            document.head.appendChild(script);
        }

        /**
         * Initializes the Web Chat interface.
         * @param {HTMLElement} container - The container element.
         * @param {string} token - The Direct Line token.
         * @param {Object} styles - The chat styles.
         * @throws {Error} If WebChat initialization fails.
         */
        function initializeWebChat(container, token, styles) {
            loadWebChatScript(() => {
                try {
                    const { renderWebChat, createDirectLine } = window.WebChat;
                    const directLine = createDirectLine({ token });
                    const userLocale = navigator.language || navigator.languages[0] || 'en-US';

                    renderWebChat(
                        {
                            directLine,
                            styleOptions: styles,
                            userID: `user-${styles.userAvatarInitials || 'U'}`,
                            username: 'User',
                            locale: userLocale,
                        },
                        container
                    );

                    // Focus input box after render
                    const iframe = container.querySelector('iframe');
                    if (iframe) {
                        iframe.addEventListener('load', () => {
                            try {
                                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                                const inputBox = iframeDoc.querySelector('input');
                                inputBox?.focus();
                            } catch (e) {
                                console.warn('Unable to focus input box:', e);
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error initializing WebChat:', error);
                    throw new Error('Failed to initialize WebChat: ' + error.message);
                }
            });
        }

        // Return the public API
        return {
            initSession,
            VERSION
        };
    })();

    return BesperBot;
}));