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
