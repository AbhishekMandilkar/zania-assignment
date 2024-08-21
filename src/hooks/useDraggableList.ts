import { useCallback, useState } from "react";
import { Item } from "../interfaces";
import { INIT_DATA } from "../constants";
import { DropResult } from "react-beautiful-dnd";
import { reorder } from "../utils";

const useDraggableList = () => {
  const [list, setList] = useState<Item[]>(INIT_DATA);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const reorderedItems = reorder(
        list,
        result.source.index,
        result.destination.index
      );

      setList(reorderedItems);
    },
    [list]
  );

  const handleSelect = useCallback(
    (item: Item) => {
      setSelectedItem(item);
    },
    [setSelectedItem]
  );

  const handleClose = useCallback(() => {
    setSelectedItem(undefined);
  }, [setSelectedItem]);

  return {
    list,
    selectedItem,
    onDragEnd,
    handleSelect,
    handleClose,
  };
};

export default useDraggableList;
