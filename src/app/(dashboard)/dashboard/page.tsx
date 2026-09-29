// // export default function DashboardPage() {
// //   return <div className="p-6">Dashboard</div>
// // }

"use client";

import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";

import Draggable from "../../../components/draggable";
import Droppable from "../../../components/droppable";

export default function App() {
  const targets = ["A", "B", "C"];

  const [target, setTarget] = useState<string | undefined>();

  const draggable = (
    <Draggable id="draggable">
      Drag me
    </Draggable>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-black p-10">
      <h1 className="text-2xl font-bold text-white">
        dnd-kit Demo
      </h1>

      <DragDropProvider
        onBeforeDragStart={(event) => {
          // Optionally prevent dragging
          // if (shouldPreventDrag(event.operation.source)) {
          //   event.preventDefault();
          // }
          console.log("Before drag starts:", event.operation.source);
        }}

        onDragStart={({operation}) => {
          console.log('Started dragging', operation.source?.id);
        }}
        
        onDragMove={({operation}) => {
          const {position} = operation;
          console.log('Current position:', position);
        }}

        onDragOver={({operation}) => {
          const {source, target} = operation;
          console.log(`${source?.id} is over ${target?.id}`);
        }}

        onDragEnd={({operation}) => {
          const {source, target} = operation;
          
          if (target) {
            console.log(`Dropped ${source?.id} onto ${target.id}`);
            setTarget(String(target.id));
          } else {
            console.log("Dropped outside");
            setTarget(undefined);
          }
        }}
      >
        {!target ? draggable : null}

        <div className="flex gap-6">
          {targets.map((id) => (
            <Droppable key={id} id={id}>
              {target === id ? draggable : `Droppable ${id}`}
            </Droppable>
          ))}
        </div>
      </DragDropProvider>
    </main>
  );
}