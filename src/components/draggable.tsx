"use client";

import { useDraggable } from "@dnd-kit/react";
import type { ReactNode } from "react";

type DraggableProps = {
  id: string;
  children: ReactNode;
};


function Draggable({ id, children }: DraggableProps) {
  const { ref } = useDraggable({
    id: "draggable",
  });

  return (
    <button
      ref={ref}
      className="rounded-lg bg-white px-5 py-3 text-black font-bold shadow"
    >
      Draggable
    </button>
  );
}

export default Draggable;