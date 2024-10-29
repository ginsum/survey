import DndQuestionList from "../dnd/DndQuestionList";

export default function SideMenu() {
  return (
    <div className="2xl:absolute 2xl:w-[350px] 2xl:min-h-screen 2xl:mt-0 w-full h-full p-4 mt-10 bg-slate-100 top-0 left-0">
      <div className="my-2">질문 리스트</div>

      <div className="flex flex-col items-center gap-3">
        <DndQuestionList />
      </div>
    </div>
  );
}
