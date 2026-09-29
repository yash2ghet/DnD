"use client";

import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

type DroppableProps = {
  id: string;
  children: ReactNode;
};

function Droppable({ id, children }: DroppableProps) {
   const { isDropTarget, ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      className={`flex h-64 w-72 border-2 items-center justify-center rounded-xl shadow-md transition-all duration-200 ${
        isDropTarget
          ? "shadow-lg border-blue-500 bg-blue-100"
          : "border-green-700 bg-green-50 hover:bg-green-100 hover:shadow-lg"
      }`}
    >
      {isDropTarget ? "Draggable element is over me" : children}
    </div>
  );
}

export default Droppable;