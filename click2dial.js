chrome.contextMenus.create({
    "id": "click2dial",
    "title": "Dial '%s'",
    "contexts": ["selection"],
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "click2dial") {
        let tel = info.selectionText;

        // Drop everything excelt for digits, +, ( and )
        tel = tel.replace(/[^0-9+()]/g, '')

        // If the number starts with a +, remove any (0)
        if (tel.startsWith('+') && tel.includes('(0)')) {
            tel = tel.replace('(0)', '');
        }

        if (tel) {
            chrome.tabs.create({
                url: "tel://" + tel
            });
        }
    }
});