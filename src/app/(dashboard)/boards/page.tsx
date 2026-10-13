// export default function BoardsPage() {
//   return <div className="p-6">Boards</div>
// }

"use client";

import Sortable from "@/components/sortable";

export default function App() {
  const items = [1, 2, 3, 4];

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-10">
      <ul className="flex flex-col gap-4">
        {items.map((id, index) => (
          <Sortable key={id} id={id} index={index} />
        ))}
      </ul>
    </main>
  );
}