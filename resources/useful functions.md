# Useful Functions

## window.BeforeUnloadEvent

### Description
The `BeforeUnloadEvent` is fired when the window, document, and its resources are about to be unloaded. This event is particularly useful for preventing accidental navigation away from a page with unsaved changes.

### Benefits
1. **Prevent Data Loss**: Warn users before they accidentally close a tab or navigate away from a form with unsaved changes
2. **Improved User Experience**: Give users a chance to save their work before leaving
3. **Clean-up Operations**: Perform necessary cleanup tasks before the page unloads
4. **Session Management**: Ensure important data is saved before the user leaves

### Usage Example
```javascript
// Add event listener for beforeunload
window.addEventListener('beforeunload', (event) => {
  // Check if there are unsaved changes
  if (hasUnsavedChanges) {
    // Modern browsers require returnValue to be set
    event.preventDefault();
    event.returnValue = '';
    
    // Note: Custom messages are no longer shown in modern browsers
    // for security reasons. A generic message will be shown instead.
    return '';
  }
});

// Remove the event listener when changes are saved
function saveChanges() {
  // Save the changes
  hasUnsavedChanges = false;
  window.removeEventListener('beforeunload', beforeUnloadHandler);
}
```

### Best Practices
1. Only use when necessary (e.g., forms with unsaved changes)
2. Remove the event listener when it's no longer needed
3. Keep the logic simple to ensure quick execution
4. Consider using it in combination with a state management system