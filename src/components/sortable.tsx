"use client";

import { useSortable } from "@dnd-kit/react/sortable";

type SortableProps = {
  id: number;
  index: number;
};

function Sortable({ id, index }: SortableProps) {
  const { ref } = useSortable({
    id,
    index,
  });

  return (
    <li
      ref={ref}
      className="flex h-16 w-72 px-5 items-center rounded-lg bg-white font-bold text-black"
    >
      Item {id}
    </li>
  );
}

export default Sortable;