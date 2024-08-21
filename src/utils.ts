import {DraggingStyle, NotDraggingStyle} from "react-beautiful-dnd";
import {Item} from "./interfaces";

export const reorder = (list: Item[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  userSelect: "none",
  boxShadow: isDragging ? `2px 14px 48px -12px rgba(163,163,163,1)` : "none",
  ...draggableStyle,
});