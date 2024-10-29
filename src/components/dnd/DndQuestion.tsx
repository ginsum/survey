import { answerType } from "@/lib/contants";
import { moveQuestion } from "@/redux/questionSlice";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import dragHandle from "../../assets/drag-handle.svg";

export default function DndOption({
  id,
  question,
  type,
}: {
  id: string;
  question: string;
  type: string;
}) {
  const dispatch = useDispatch();

  const [, drag, preview] = useDrag(() => ({
    type: "option",
    item: { id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));

  const [, drop] = useDrop({
    accept: "option",
    hover: (draggedItem: any) => {
      const dragId = draggedItem.id;
      const hoverId = id;

      if (dragId === hoverId) {
        return;
      }

      dispatch(moveQuestion({ id, fromId: dragId, toId: hoverId }));
    },
  });

  const findType = answerType.find(({ id: answerId }) => answerId === type);

  return (
    <div ref={preview} className="flex w-full justify-between">
      <div className="flex w-full items-center gap-1">
        <div className="h-full" ref={drop}>
          <div ref={drag} className="flex items-center w-4 h-full bg-slate-100">
            <img src={dragHandle} className="w-4" />
          </div>
        </div>
        <div
          key={id}
          className="flex w-full p-3 justify-between border rounded-lg gap-2 bg-slate-50"
        >
          <div className="w-[200px] text-sm whitespace-nowrap overflow-hidden text-ellipsis">
            {question}
          </div>
          <div className="flex justify-end w-14 text-xs">
            {findType?.label.slice(0, 4)}
          </div>
        </div>
      </div>
    </div>
  );
}
