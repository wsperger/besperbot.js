import os
import logging

# Configure logging
logging.basicConfig(
    filename='setup_log.txt',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Define the expected folder and file structure
EXPECTED_STRUCTURE = {
    'besperbot.js': {
        '.gitignore': '',
        'README.md': '',
        'LICENSE': '',
        'besperbot.js': '',
        'styles.css': '',
        'config.json': '{\n  "API_ENDPOINT": "https://b-esper-apim.azure-api.net/dev/sessions/initiate"\n}',
        'dist': {
            'besperbot.bundle.js': ''
        },
        'test': {
            'index.html': '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BesperBot.js Test</title>
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <h1>BesperBot.js Test</h1>
  <div id="chatbot-container"></div>

  <!-- Include the bundled BesperBot.js -->
  <script src="../dist/besperbot.bundle.js"></script>
  <script>
    // Initialize the chatbot after the library is loaded
    window.addEventListener('DOMContentLoaded', () => {
      BesperBot.initSession({
        id: 'asst_G2sMr86edlZJfXqxkNqIwmDN',
        containerId: 'chatbot-container',
        widget: true
      });
    });
  </script>
</body>
</html>'''
        }
    }
}

def create_structure(base_path, structure, added_items):
    for name, content in structure.items():
        path = os.path.join(base_path, name)
        if isinstance(content, dict):
            # It's a directory
            if not os.path.exists(path):
                os.makedirs(path)
                added_items.append(f"Directory created: {path}")
            # Recurse into the directory
            create_structure(path, content, added_items)
        else:
            # It's a file
            if not os.path.exists(path):
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(content)
                added_items.append(f"File created: {path}")

def main():
    base_directory = os.path.abspath('.')  # You can set this to your project root
    added_items = []

    create_structure(base_directory, EXPECTED_STRUCTURE, added_items)

    if added_items:
        logging.info("Setup completed. Added the following items:")
        for item in added_items:
            logging.info(item)
        print("Setup completed. Check 'setup_log.txt' for details.")
    else:
        logging.info("Setup completed. No new folders or files were added.")
        print("All required folders and files are present.")

if __name__ == "__main__":
    main()