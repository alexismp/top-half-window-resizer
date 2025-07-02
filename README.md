# VideoCallSight - Chrome Extension

A simple, lightweight Chrome extension to quickly resize the current browser window to occupy the top half of your primary display for better eye contact when in a video call.

## Features

-   **Configurable Options**: Customize vertical space and screen margins via extension settings.
-   **One-Click Resize**: A single button press resizes your window instantly.
-   **Intelligent Sizing**: Calculates dimensions based on your primary monitor's available work area.
-   **Smart Margins**: Keeps a 3% margin from the top, left, and right edges for a clean layout.
-   **Dark Theme UI**: Clean, modern, and easy on the eyes.
-   **No Permissions Abuse**: Only requests the `windows` and `system.display` permissions necessary for its function.
-   **Built for Manifest V3**: Uses the latest Chrome extension platform.

## How to Install

Since this extension is not on the Chrome Web Store, you can load it into Chrome manually by following these steps:

1.  **Download the Files**: Download all the provided files (`manifest.json`, `popup.html`, `popup.js`, `README.md`, and the `assets` folder) and save them together in a single folder on your computer. Let's call the folder `chrome-resizer-extension`.

2.  **Open Chrome Extensions Page**: Open your Google Chrome browser and navigate to the extensions management page by typing `chrome://extensions` into the address bar and pressing Enter.

3.  **Enable Developer Mode**: In the top-right corner of the extensions page, find the "Developer mode" toggle and switch it ON. This will reveal a new menu bar with options for developers.

    

4.  **Load the Extension**:
    -   Click on the **"Load unpacked"** button that appeared on the left side of the menu bar.
    -   A file selection dialog will open.
    -   Navigate to and select the folder where you saved the extension files (e.g., `chrome-resizer-extension`). Do **not** select an individual file; select the entire folder.

5.  **Installation Complete**: The "VideoCallSight" extension will now appear in your list of installed extensions.

6.  **Pin for Easy Access**: Click the puzzle piece icon (Extensions) in your Chrome toolbar. Find the "VideoCallSight" in the list and click the pin icon next to it. This will add the extension's icon to your toolbar for quick one-click access.

Now you can click the icon anytime to open the popup and resize your current window!

### Disclaimer

This list is not an official Google product. Links on this list also are not necessarily to official Google products.

---
*This project was largely developed with the assistance of the [Gemini CLI](https://github.com/google-gemini/gemini-cli/).*
