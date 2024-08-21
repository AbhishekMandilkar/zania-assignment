import {Item} from "../interfaces";
import AsyncImage from "./AsyncImage";
import LoadingSpinner from "./LoadingSpinner";
import {DraggableProvided, DraggableStateSnapshot} from "react-beautiful-dnd";
import {getItemStyle} from "../utils";

interface CardProps {
  item: Item;
  draggableProvided: DraggableProvided;
  draggableSnapshot: DraggableStateSnapshot;
  onSelect: (item: Item) => void;
}

const Card = (props: CardProps) => {
  const { item, draggableProvided, draggableSnapshot, onSelect } = props;

  return (
    <div
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
      style={getItemStyle(
        draggableSnapshot.isDragging,
        draggableProvided.draggableProps.style
      )}
      className="draggable-item"
      onClick={() => onSelect(item)}
    >
      <AsyncImage
        imageProps={{
          src: item.image,
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
      <p>{item.title}</p>
    </div>
  );
};

export default Card;
