import DndQuestionList from "../dnd/DndQuestionList";

export default function SideMenu() {
  return (
    <div className="absolute w-[350px] h-full min-h-screen p-4 bg-slate-100 top-0 left-0">
      <div className="my-2">질문 리스트</div>

      <div className="flex flex-col items-center gap-3">
        <DndQuestionList />
      </div>
    </div>
  );
}
