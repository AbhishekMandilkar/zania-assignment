import "./App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./components/Card";
import Modal from "./components/Modal/Modal";
import useDraggableList from "./hooks/useDraggableList";
import AsyncImage from "./components/AsyncImage";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const { list, selectedItem, onDragEnd, handleSelect, handleClose } =
    useDraggableList();

  return (
    <>
      <ul>
        <li>Load time is simulated 500ms</li>
        <li>Drag and drop to reorder</li>
        <li>Press escape to close modal</li>
      </ul>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="list-container"
            >
              {list.map((item, index) => (
                <Draggable
                  key={item.type}
                  draggableId={item.type}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <Card
                      onSelect={handleSelect}
                      item={item}
                      draggableProvided={draggableProvided}
                      draggableSnapshot={draggableSnapshot}
                    />
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {!!selectedItem && (
        <Modal open onClose={handleClose}>
          {selectedItem.title}
          <AsyncImage
            imageProps={{
              src: selectedItem.image,
              style: {
                width: "100%",
                height: "100%",
              },
            }}
            loadingView={
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoadingSpinner size={50} />
              </div>
            }
          />
        </Modal>
      )}
    </>
  );
}

export default App;
