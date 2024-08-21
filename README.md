# Front-end focused take home assignment

This repo is submission for Application for Frontend Engineer @ Zania.ai

As per given document,

- This project shows list of card, 3 on first row 2 on second
- Each card has a image and a tile

## Showing Loader for images loaded in the <img /> 

- Component has two props
  1. loadingView -> custom loaders that can passed from parent
  2. imageProp -> these are props for the img tag with typesafety
- we track the loaded src of the img in the state
- when component mounts it check if the loadedSrc is defined or not, if it isnt then we create new ImageObject and set its src to the provided src and add event listener for load event
- when event is fired we simulate 500ms delay and update the state with the src
- the component check if the loadedSrc and imgProp src matching, if yes we load img untill then we show loader

## For drag & drop
- we use lib called as dnd-kit 
- here we define all sensors required and pass to droppable area context, all draggable cards are wraped under draggable context with listeners and refs passed to it.

## CUSTOM HOOK -1  > useDraggableList.ts

This custom hook manages a draggable list of items, including selection and drag-and-drop operations.

Description:

	•	State Management:
	•	list: Manages the state of the list of items, initialized with INIT_DATA.
	•	selectedItem: Manages the state of the currently selected item.
	•	Sensors:
	•	We use dnd-kit’s useSensor and useSensors to define the sensors required for the drag-and-drop operation.
	•	The PointerSensor is configured with an activation constraint to start drag-and-drop only after the pointer has moved at least 5 pixels. This allows for elements to register their own onClick events without being interrupted by drag-and-drop.
	•	Handlers:
	•	handleDragEnd: This function is triggered when the drag-and-drop action ends. It checks if the dragged item has been moved to a different position in the list. If so, it updates the list’s state using the arrayMove function to reorder the items.
	•	handleSelect: A callback function to select an item, setting the selectedItem state.
	•	handleClose: A callback function to deselect the item, resetting the selectedItem state to undefined.

Return:

	•	The hook returns the following:
	•	list: The current state of the draggable list.
	•	selectedItem: The currently selected item, if any.
	•	sensors: The sensors for drag-and-drop operations.
	•	handleSelect: Function to select an item.
	•	handleClose: Function to close the selected item.
	•	handleDragEnd: Function to handle the drag-end event.

This hook encapsulates the logic required for managing a draggable list with item selection, making it reusable across different components.

## CUSTOM HOOK 2 > useKeyDown.ts
This custom hook manages keydown event listeners, allowing you to trigger a callback function when specific keys are pressed.

Description:

	•	Event Handling:
	•	The hook listens for keydown events on the document.
	•	onKeyDown is a callback function that checks if any of the specified keys are pressed. If one of the keys is pressed, the event is prevented from triggering its default behavior, and the provided callback function is executed.
	•	useCallback:
	•	onKeyDown is wrapped in a useCallback hook to ensure that the function reference remains stable across re-renders unless the callback or keys change.
	•	useEffect:
	•	The hook uses useEffect to add the keydown event listener when the component mounts and clean it up when the component unmounts or when onKeyDown changes. This ensures that the event listener is always up-to-date with the latest version of the onKeyDown function.

Parameters:

	•	callback: The function to be called when one of the specified keys is pressed.
	•	keys: An array of strings representing the keys that should trigger the callback when pressed.

Return:

	•	The hook does not return any value but sets up and manages the keydown event listener.

This hook encapsulates the logic for handling specific keydown events, making it reusable across different components.