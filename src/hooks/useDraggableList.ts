import {useCallback, useState} from "react";
import {Item} from "../interfaces";
import {INIT_DATA} from "../constants";
import {arrayMove} from "@dnd-kit/sortable";
import {DragEndEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";

const useDraggableList = () => {
  const [list, setList] = useState<Item[]>(INIT_DATA);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  const sensors = useSensors(
    useSensor(PointerSensor,{
      activationConstraint: {
        // This is done to activate the dnd only when pointer is moved atleast 5 pixels, so the elem can register its own onClick event
        distance: 5
      }
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    
    if (active.id !== over?.id && active?.id && over?.id) {
      setList((items) => {
        const oldIndex = items.findIndex((item) => item.type === active.id);
        const newIndex = items.findIndex((item) => item.type === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

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
    sensors,
    handleSelect,
    handleClose,
    handleDragEnd
  };
};

export default useDraggableList;
