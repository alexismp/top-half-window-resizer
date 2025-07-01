chrome.action.onClicked.addListener(async (tab) => {
    try {
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
        const newHeight = Math.round((workArea.height * 0.65) - marginTop);
        const newLeft = Math.round(workArea.left + marginHorizontal);
        const newTop = Math.round(workArea.top + marginTop);

        // 4. Get the current window
        const currentWindow = await chrome.windows.getCurrent();

        // 5. Update the window
        await chrome.windows.update(currentWindow.id, {
            left: newLeft,
            top: newTop,
            width: newWidth,
            height: newHeight,
            state: 'normal'
        });

    } catch (error) {
        console.error("Resize failed:", error);
    }
});
