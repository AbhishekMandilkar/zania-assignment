import "./App.css";
import Card from "./components/Card";
import Modal from "./components/Modal/Modal";
import useDraggableList from "./hooks/useDraggableList";
import AsyncImage from "./components/AsyncImage";
import LoadingSpinner from "./components/LoadingSpinner";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

function App() {
  const {
    list,
    selectedItem,
    sensors,
    handleDragEnd,
    handleSelect,
    handleClose,
  } = useDraggableList();
  console.log(selectedItem);
  return (
    <>
      <ul>
        <li>Load time is simulated 500ms</li>
        <li>Drag and drop to reorder</li>
        <li>Press escape to close modal</li>
      </ul>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={list.map((item) => item.type)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="list-container">
            {list.map((item) => (
              <Card
                onSelect={handleSelect}
                item={item}
                key={item.type}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
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
