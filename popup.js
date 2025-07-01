document.addEventListener('DOMContentLoaded', () => {
    const resizeBtn = document.getElementById('resizeBtn');
    const statusDiv = document.getElementById('status');

    if (!resizeBtn || !statusDiv) {
        console.error("Popup UI elements not found!");
        return;
    }

    const setStatus = (message, type) => {
        statusDiv.textContent = message;
        statusDiv.className = `status-${type}`;
    };

    const setLoadingState = (isLoading) => {
        if (isLoading) {
            resizeBtn.disabled = true;
            resizeBtn.innerHTML = 'Resizing... <div class="spinner"></div>';
            setStatus('', '');
        } else {
            resizeBtn.disabled = false;
            resizeBtn.innerHTML = 'Resize Window';
        }
    };

    resizeBtn.addEventListener('click', async () => {
        setLoadingState(true);
        try {
            // Check for API availability
            if (!chrome.system || !chrome.system.display) {
                throw new Error("The 'system.display' API is not available.");
            }
            if (!chrome.windows) {
                throw new Error("The 'windows' API is not available.");
            }

            // 1. Get all display information
            const displays = await chrome.system.display.getInfo();
            if (!displays || displays.length === 0) {
                throw new Error("No display information found.");
            }

            // 2. Find the primary display
            const primaryDisplay = displays.find(d => d.isPrimary) || displays[0];
            const workArea = primaryDisplay.workArea;

            // 3. Calculate target dimensions with a 3% margin
            const marginHorizontal = workArea.width * 0.03;
            const marginTop = workArea.height * 0.03;

            const newWidth = Math.round(workArea.width - (marginHorizontal * 2));
            // Height is half the screen, minus the top margin
            const newHeight = Math.round((workArea.height / 2) - marginTop); 
            const newLeft = Math.round(workArea.left + marginHorizontal);
            const newTop = Math.round(workArea.top + marginTop);

            // 4. Get the current window
            const [currentWindow] = await chrome.windows.getCurrent();

            // 5. Update the window
            await chrome.windows.update(currentWindow.id, {
                left: newLeft,
                top: newTop,
                width: newWidth,
                height: newHeight,
                state: 'normal' // Ensure window is not maximized/minimized
            });

            // 6. Show success and close popup
            setStatus('Resized successfully!', 'success');
            setTimeout(() => {
                window.close();
            }, 1500);

        } catch (error) {
            console.error("Resize failed:", error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setStatus(`Error: ${errorMessage}`, 'error');
            setLoadingState(false);
        }
    });
});
