import { useCallback, useEffect, useRef, useState } from "react";
import { Item, LocalStorageKeys } from "../interfaces";
import { INIT_DATA } from "../constants";
import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { reorder } from "../utils";
import useLocalStorage from "./useLocalStorage";

const useDraggableList = () => {
  const [componentState, setComponentState] = useState<{
    loading: boolean;
    selectedItem: Item | undefined;
    list: Item[];
    lastUpdated?: string;
  }>({
    loading: false,
    selectedItem: undefined,
    list: INIT_DATA,
    lastUpdated: "",
  });

  const onChangeComponentState = useCallback(
    (
      key: keyof typeof componentState,
      value: string | boolean | Item | Item[] | undefined
    ) => {
      setComponentState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const localStorage = useLocalStorage();
  const timeoutRef = useRef<number | null>(null);

  const POST = useCallback(
    async (data: Item[]) => {
      onChangeComponentState("loading", true);
      await new Promise((resolve) => {
        setTimeout(() => {
          localStorage.set(LocalStorageKeys.list, JSON.stringify(data));
          const currentTime = Date.now();
          const localTimeString = new Date(currentTime).toLocaleString();
          localStorage.set(LocalStorageKeys.lastUpdated, Date.now());
          onChangeComponentState("loading", false);
          onChangeComponentState("lastUpdated", localTimeString);
          resolve(true);
        }, 600);
      });
    },
    [localStorage, onChangeComponentState]
  );

  const triggerTimeout = useCallback(
    (newList: Item[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        POST(newList);
      }, 2000);
    },
    [POST]
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id && active?.id && over?.id) {
      const oldIndex = componentState.list.findIndex(
        (item) => item.type === active.id
      );
      const newIndex = componentState.list.findIndex(
        (item) => item.type === over.id
      );

      const newList = reorder(componentState.list, oldIndex, newIndex);
      onChangeComponentState("list", newList);
      triggerTimeout(newList);
    }
  }

  const GET = useCallback(async () => {
    const data = await localStorage.get(LocalStorageKeys.list);
    const lastUpdated = await localStorage.get(LocalStorageKeys.lastUpdated);
    if (data) {
      onChangeComponentState("list", JSON.parse(data));
      if (lastUpdated) {
        const formattedLastUpdated = new Date(lastUpdated).toLocaleString();
        onChangeComponentState("lastUpdated", formattedLastUpdated);
      }
    } else {
      onChangeComponentState("list", INIT_DATA);
      triggerTimeout(INIT_DATA);
    }
  }, [localStorage, onChangeComponentState, triggerTimeout]);

  useEffect(() => {
    GET();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = useCallback(
    (item: Item) => {
      onChangeComponentState("selectedItem", item);
    },
    [onChangeComponentState]
  );

  const handleClose = useCallback(() => {
    onChangeComponentState("selectedItem", undefined);
  }, [onChangeComponentState]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // This is done to activate the dnd only when pointer is moved atleast 5 pixels, so the elem can register its own onClick event
        distance: 5,
      },
    })
  );

  return {
    list: componentState.list,
    selectedItem: componentState.selectedItem,
    sensors,
    loading: componentState.loading,
    lastUpdated: componentState.lastUpdated,
    handleSelect,
    handleClose,
    handleDragEnd,
  };
};

export default useDraggableList;
