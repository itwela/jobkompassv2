# Custom Dialog Implementation Guide

## Overview
This guide documents the implementation of our custom dialog system that maintains background scrolling functionality while providing a flexible and reusable dialog component.

## Key Components

### 1. Dialog Context Provider (`dialogProvider.tsx`)
The foundation of the dialog system is the context provider that manages dialog state:

```typescript
interface DialogContextType {
  dialogId: string;
  setDialogId: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeDialog: string | null;
  setActiveDialog: (dialog: string | null) => void;
  openDialog: (dialogId: string) => void;
  closeDialog: () => void;
  toggleDialog: (dialogId: string) => void;
}
```

### 2. Core Dialog Components
- `Dialog`: Base wrapper component
- `DialogTrigger`: Opens the dialog
- `DialogContent`: Main content container with backdrop
- `DialogHeader`: Header section
- `DialogFooter`: Footer section
- `DialogClose`: Close button component

## Implementation Steps

1. **Set up the Dialog Provider**
   - Wrap your application with `DialogProvider`
   - Provider manages dialog state and provides context

2. **Create Dialog Components**
   ```tsx
   <Dialog>
     <DialogTrigger element={<YourTriggerElement />} />
     <DialogContent>
       <DialogHeader>Your Header</DialogHeader>
       Your Content
       <DialogFooter>Your Footer</DialogFooter>
     </DialogContent>
   </Dialog>
   ```

3. **Handle Dialog State**
   - Use `useDialog` hook to access dialog state
   - Manage dialog visibility with `isOpen` and `setIsOpen`
   - Track active dialog with `activeDialog` and `setActiveDialog`

## Key Features

### Background Scroll Preservation
- The dialog system maintains background scrolling
- Uses fixed positioning with z-index management
- Backdrop blur effect without freezing the main content

### Dialog Identification
- Each dialog can have a unique identifier
- Allows multiple dialogs to be managed independently
- Prevents conflicts between different dialog instances

### Flexible Styling
- Supports custom styling through className and style props
- Maintains consistent theme across the application
- Responsive design with proper positioning

## Usage Example

```tsx
<Dialog>
  <DialogTrigger element={<Button>Open Dialog</Button>} />
  <DialogContent className="custom-dialog">
    <DialogHeader>
      <h2>Dialog Title</h2>
      <DialogClose />
    </DialogHeader>
    <div>Your dialog content here</div>
    <DialogFooter>
      <Button>Action</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Best Practices

1. Always provide unique dialog IDs when using multiple dialogs
2. Use the DialogProvider at the root level of your application
3. Leverage the useDialog hook for programmatic control
4. Maintain consistent styling through theme provider
5. Consider accessibility when implementing custom triggers

## Troubleshooting

- If dialogs aren't opening, check if DialogProvider is properly set up
- For styling issues, ensure proper z-index management
- If background scroll is locked, verify DialogContent positioning
- For multiple dialog conflicts, check unique dialog IDs