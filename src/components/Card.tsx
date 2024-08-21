import { useSortable } from "@dnd-kit/sortable";
import { Item } from "../interfaces";
import AsyncImage from "./AsyncImage";
import LoadingSpinner from "./LoadingSpinner";
import { CSS } from "@dnd-kit/utilities";
interface CardProps {
  item: Item;
  onSelect: (item: Item) => void;
}

const Card = (props: CardProps) => {
  const { item, onSelect } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.item.type });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={() => onSelect(item)}
      {...listeners}
      className="draggable-item"
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
