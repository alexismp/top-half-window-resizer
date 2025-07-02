// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

chrome.action.onClicked.addListener(async (tab) => {
    try {
        // Get user options
        const options = await chrome.storage.sync.get({
            verticalPercentage: 65,
            enableMargins: true,
            marginPercentage: 3
        });

        // 1. Get all display information
        const displays = await chrome.system.display.getInfo();
        if (!displays || displays.length === 0) {
            throw new Error("No display information found.");
        }

        // 2. Find the primary display
        const primaryDisplay = displays.find(d => d.isPrimary) || displays[0];
        const workArea = primaryDisplay.workArea;

        // 3. Calculate target dimensions with margins if enabled
        let marginHorizontal = 0;
        let marginTop = 0;

        if (options.enableMargins) {
            marginHorizontal = workArea.width * (options.marginPercentage / 100);
            marginTop = workArea.height * (options.marginPercentage / 100);
        }

        const newWidth = Math.round(workArea.width - (marginHorizontal * 2));
        const newHeight = Math.round((workArea.height * (options.verticalPercentage / 100)) - marginTop);
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