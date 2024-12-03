
(function (global) {
  const BesperBot = (function () {
      // Define default styles
      const DEFAULT_STYLES = {
          width: '400px',
          height: '600px',
          backgroundColor: '#ffffff',
          bubbleBackground: '#f7fafc',
          bubbleFromUserBackgroundColor: '#805ad5',
          bubbleTextColor: '#1a202c',
          bubbleFromUserTextColor: '#ffffff',
          bubbleBorderColor: '#edf2f7',
          bubbleFromUserBorderColor: '#805ad5',
          bubbleBorderRadius: '16px',
          bubbleFromUserBorderRadius: '16px',
          bubblePadding: '16px',
          bubbleFromUserPadding: '16px',
          fontSize: '15px',
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          inputBoxFontSize: '15px',
          inputBoxFontFamily: "'SF Pro Display', -apple-system, sans-serif",
          botAvatarImage: '',
          botAvatarInitials: 'AI',
          userAvatarImage: '',
          userAvatarInitials: 'U',
          botAvatarSize: '36px',
          userAvatarSize: '36px',
          suggestedActionBackgroundColor: '#805ad5',
          suggestedActionTextColor: '#ffffff',
          suggestedActionBorderColor: '#805ad5',
          suggestedActionBorderRadius: '24px',
          suggestedActionPadding: '12px',
          timestampFont: '12px SF Pro Display',
          timestampColor: '#718096',
          sendBoxBackgroundColor: '#f7fafc',
          sendBoxBorderColor: '#edf2f7',
          sendBoxBorderRadius: '12px',
          sendBoxHeight: '48px',
          sendBoxTextColor: '#1a202c',
          sendBoxPadding: '16px',
          rootHeight: '600px',
          rootWidth: '100%',
          textContentColor: '#1a202c',
          textContentFontFamily: "'SF Pro Display', -apple-system, sans-serif",
          textContentFontWeight: '400',
          hideUploadButton: true,
          animationDuration: '0.2s',
          messagePadding: '16px',
          widgetBackgroundColor: '#ffffff',
          widgetColor: '#000000',
          widgetWidth: '60px',
          widgetHeight: '60px',
      };

      // Define the API endpoint
      const API_ENDPOINT = 'https://b-esper-apim.azure-api.net/dev/sessions/initiate';

      /**
       * Initializes the chatbot session.
       * @param {Object} params - Parameters for session initialization.
       * @param {string} params.id - The bot identifier.
       * @param {string} [params.containerId="chatbot-container"] - The ID of the container element.
       * @param {boolean} [params.widget=true] - Flag to render as widget or embedded chat.
       */
      async function initSession({ id, containerId = "chatbot-container", widget = true }) {
          console.log('BesperBot.initSession called with parameters:', { id, containerId, widget });

          try {
              console.log(`Fetching data from: ${API_ENDPOINT}`);

              // Prepare the payload
              const payload = {
                  product: 'directline-access',
                  action: 'get_directline_access',
                  data: { 'bot-identifier': id }
              };
              console.log('Payload to send:', payload);

              // Make the API call to fetch session details and styles
              const response = await fetch(API_ENDPOINT, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
              });

              console.log(`Received response with status: ${response.status}`);

              if (!response.ok) {
                  const errorText = await response.text();
                  console.error('API Error:', response.status, errorText);
                  throw new Error(`API Error: ${response.status} ${errorText}`);
              }

              const responseData = await response.json();
              console.log('Payload received from API:', responseData);

              if (!responseData.success || !responseData.token || !responseData.chatStyles) {
                  console.error('Invalid payload structure received:', responseData);
                  throw new Error('Invalid payload structure received from API.');
              }

              const { token, widgetStyles, chatStyles, containerId: apiContainerId, widget: apiWidget } = responseData;

              // Determine the container ID and widget flag (API response takes precedence)
              const finalContainerId = apiContainerId || containerId;
              const finalWidget = typeof apiWidget === 'boolean' ? apiWidget : widget;

              // Get the container element
              const container = document.getElementById(finalContainerId);
              if (!container) {
                  console.error(`Container with ID "${finalContainerId}" not found.`);
                  throw new Error(`Container with ID "${finalContainerId}" not found.`);
              }

              // Merge default widget styles and chat styles with fetched styles
              const finalWidgetStyles = { ...DEFAULT_STYLES, ...widgetStyles };
              const finalChatStyles = { ...DEFAULT_STYLES, ...chatStyles };
              console.log('Final widget styles to apply:', finalWidgetStyles);
              console.log('Final chat styles to apply:', finalChatStyles);

              // Apply styles to the document
              applyStyles(finalWidgetStyles, finalChatStyles);

              // Render the chatbot based on the widget flag
              if (finalWidget) {
                  console.log('Rendering chatbot as a widget.');
                  renderWidget(container, { token, widgetStyles: finalWidgetStyles, chatStyles: finalChatStyles });
              } else {
                  console.log('Rendering chatbot directly in the container.');
                  renderChat(container, { token, chatStyles: finalChatStyles });
              }

          } catch (error) {
              console.error('Error in initSession:', error);
          }
      }

      /**
       * Applies the provided widget and chat styles to the document.
       * @param {Object} widgetStyles - Styles for the widget button.
       * @param {Object} chatStyles - Styles for the chat container.
       */
      function applyStyles(widgetStyles, chatStyles) {
          console.log('Applying widget styles:', widgetStyles);
          console.log('Applying chat styles:', chatStyles);
          let styleTag = document.getElementById('besperbot-styles');
          if (!styleTag) {
              styleTag = document.createElement('style');
              styleTag.id = 'besperbot-styles';
              document.head.appendChild(styleTag);
              console.log('Created new style tag with ID "besperbot-styles".');
          } else {
              console.log('Updating existing style tag with ID "besperbot-styles".');
          }

          styleTag.innerHTML = `
              .besperbot-chat-container {
                  width: ${chatStyles.width};
                  height: ${chatStyles.height};
                  background-color: ${chatStyles.backgroundColor};
                  border-radius: ${chatStyles.bubbleBorderRadius};
                  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                  font-family: ${chatStyles.fontFamily};
                  font-size: ${chatStyles.fontSize};
                  color: ${chatStyles.textContentColor};
                  position: fixed;
                  bottom: 90px;
                  right: 20px;
                  display: none;
                  z-index: 1000;
              }

              .besperbot-widget-button {
                  width: ${widgetStyles.widgetWidth};
                  height: ${widgetStyles.widgetHeight};
                  border-radius: 50%;
                  border: none;
                  background-color: ${widgetStyles.widgetBackgroundColor};
                  color: ${widgetStyles.widgetColor};
                  font-size: 24px;
                  cursor: pointer;
                  z-index: 1001;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
              }

              .besperbot-message {
                  padding: ${chatStyles.messagePadding};
                  border-bottom: 1px solid ${chatStyles.bubbleBorderColor};
              }

              /* Add more styles as needed */
          `;
          console.log('Styles applied successfully.');
      }

      /**
       * Renders the chatbot as a widget with a toggle button.
       * @param {HTMLElement} container - The container element.
       * @param {Object} payload - The payload containing token and styles.
       */
      function renderWidget(container, payload) {
          console.log('renderWidget called with payload:', payload);
          const { token, widgetStyles, chatStyles } = payload;

          // Create widget button
          const widgetButton = document.createElement('button');
          widgetButton.className = 'besperbot-widget-button';
          widgetButton.innerHTML = '&#128172;'; // Chat icon
          container.appendChild(widgetButton);
          console.log('Widget button created and appended to container.');

          // Create chat container
          const chatContainer = document.createElement('div');
          chatContainer.className = 'besperbot-chat-container';
          container.appendChild(chatContainer);
          console.log('Chat container created and appended to container.');

          // Handle widget toggle
          let chatInitialized = false;
          widgetButton.addEventListener('click', () => {
              console.log('Widget button clicked.');
              const isVisible = chatContainer.style.display === 'block';
              chatContainer.style.display = isVisible ? 'none' : 'block';
              console.log(`Chat container visibility toggled to: ${!isVisible ? 'visible' : 'hidden'}`);

              if (!isVisible && !chatInitialized) {
                  console.log('Initializing chat for the first time.');
                  initializeWebChat(chatContainer, token, chatStyles);
                  chatInitialized = true;
              }
          });

          console.log('Widget rendering completed.');
      }

      /**
       * Renders the chatbot directly within the container without a widget button.
       * @param {HTMLElement} container - The container element.
       * @param {Object} payload - The payload containing token and styles.
       */
      function renderChat(container, payload) {
          console.log('renderChat called with payload:', payload);
          const { token, chatStyles } = payload;

          // Create chat container
          const chatContainer = document.createElement('div');
          chatContainer.className = 'besperbot-chat-container';
          chatContainer.style.display = 'block'; // Show chat by default
          container.appendChild(chatContainer);
          console.log('Chat container created and appended to container.');

          // Initialize chat immediately
          initializeWebChat(chatContainer, token, chatStyles);
          console.log('Chat initialized successfully.');
      }

      /**
       * Loads the Web Chat script if not already loaded.
       * @param {Function} callback - The callback to execute after loading the script.
       */
      function loadWebChatScript(callback) {
          if (!window.WebChat) {
              console.log('WebChat script not found. Loading script...');
              const script = document.createElement('script');
              script.src = 'https://cdn.botframework.com/botframework-webchat/latest/webchat.js';
              script.async = true;
              script.onload = () => {
                  console.log('WebChat script loaded successfully.');
                  callback();
              };
              script.onerror = () => {
                  console.error('Failed to load WebChat script.');
              };
              document.head.appendChild(script);
          } else {
              console.log('WebChat script already loaded.');
              callback();
          }
      }

      /**
       * Initializes Web Chat within the chat container.
       * @param {HTMLElement} container - The chat container element.
       * @param {string} token - The Direct Line token.
       * @param {Object} styles - The styles for Web Chat.
       */
      function initializeWebChat(container, token, styles) {
          console.log('Initializing WebChat with token:', token);
          
          // First, load the WebChat script
          loadWebChatScript(() => {
              try {
                  const { renderWebChat, createDirectLine } = window.WebChat;
                  const directLine = createDirectLine({ token });

                  const userLocale = navigator.language || navigator.languages[0] || 'en-US';
                  console.log('User locale set to:', userLocale);

                  renderWebChat(
                      {
                          directLine: directLine,
                          styleOptions: styles,
                          userID: `user-${styles.userAvatarInitials}`,
                          username: 'User',
                          locale: userLocale,
                      },
                      container
                  );
                  console.log('WebChat rendered successfully.');

                  // Optional: Focus the input box
                  const iframe = container.querySelector('iframe');
                  if (iframe) {
                      iframe.addEventListener('load', () => {
                          try {
                              const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                              const inputBox = iframeDoc.querySelector('input');
                              if (inputBox) {
                                  inputBox.focus();
                                  console.log('Input box focused.');
                              }
                          } catch (e) {
                              console.warn('Unable to focus the input box:', e);
                          }
                      });
                  } else {
                      console.warn('WebChat iframe not found. Cannot focus input box.');
                  }
              } catch (error) {
                  console.error('Error initializing WebChat:', error);
              }
          });
      }

      // Public API
      return {
          initSession
      };
  })();

  // Expose BesperBot to the global object
  global.BesperBot = BesperBot;
})(window);