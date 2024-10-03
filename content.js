// content.js

// Function to override chatroom names
function overrideChatroomNames() {
    // Load saved overrides from Chrome storage
    chrome.storage.sync.get("chatRoomOverrides", (data) => {
      const overrides = data.chatRoomOverrides || {};
  
      // Select all channel names in the sidebar
      document.querySelectorAll('.p-channel_sidebar__name').forEach((element) => {
        const originalName = element.innerText.trim();
  
        // Check if there's an override for this chatroom name
        if (overrides[originalName]) {
          element.innerText = overrides[originalName];
        }
      });
    });
  }
  
  // Run the override function on initial load
  overrideChatroomNames();
  
  // Set up a MutationObserver to catch changes in the chatroom list (dynamic updates)
  const observer = new MutationObserver(() => {
    overrideChatroomNames();
  });
  
  // Start observing changes in the document body
  observer.observe(document.body, { childList: true, subtree: true });
  