// Copyright 2024 Google LLC
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

document.addEventListener('DOMContentLoaded', () => {
    const verticalPercentageInput = document.getElementById('verticalPercentage');
    const enableMarginsCheckbox = document.getElementById('enableMargins');
    const marginPercentageInput = document.getElementById('marginPercentage');
    const marginSettingsDiv = document.getElementById('marginSettings');
    const saveButton = document.getElementById('saveButton');
    const statusDiv = document.getElementById('status');

    // Load settings
    chrome.storage.sync.get({
        verticalPercentage: 65,
        enableMargins: true,
        marginPercentage: 3
    }, (items) => {
        verticalPercentageInput.value = items.verticalPercentage;
        enableMarginsCheckbox.checked = items.enableMargins;
        marginPercentageInput.value = items.marginPercentage;
        toggleMarginSettings();
    });

    // Toggle margin settings visibility
    enableMarginsCheckbox.addEventListener('change', toggleMarginSettings);

    function toggleMarginSettings() {
        marginSettingsDiv.style.display = enableMarginsCheckbox.checked ? 'block' : 'none';
    }

    // Save settings
    saveButton.addEventListener('click', () => {
        const verticalPercentage = parseInt(verticalPercentageInput.value);
        const enableMargins = enableMarginsCheckbox.checked;
        const marginPercentage = parseInt(marginPercentageInput.value);

        if (isNaN(verticalPercentage) || verticalPercentage < 1 || verticalPercentage > 100) {
            setStatus('Error: Vertical percentage must be between 1 and 100.', 'error');
            return;
        }
        if (enableMargins && (isNaN(marginPercentage) || marginPercentage < 0 || marginPercentage > 20)) {
            setStatus('Error: Margin percentage must be between 0 and 20.', 'error');
            return;
        }

        chrome.storage.sync.set({
            verticalPercentage: verticalPercentage,
            enableMargins: enableMargins,
            marginPercentage: marginPercentage
        }, () => {
            setStatus('Settings saved!', 'success');
            setTimeout(() => { statusDiv.textContent = ''; }, 3000);
        });
    });

    function setStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = `status-${type}`;
    }
});