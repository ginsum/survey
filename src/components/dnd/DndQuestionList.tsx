import { useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { QuestionType } from "@/type";

import DndQuestion from "./DndQuestion";

export default function DndQuestionList() {
  const { list } = useSelector((state: RootState) => state.questions);
  const renderOption = useCallback(
    (question: QuestionType) => {
      return (
        <DndQuestion
          key={question.id}
          id={question.id}
          question={question.question}
          type={question.type}
        />
      );
    },
    [list]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex flex-col items-center gap-2 mt-4">
        {list.map((question) => renderOption(question))}
      </div>
    </DndProvider>
  );
}
