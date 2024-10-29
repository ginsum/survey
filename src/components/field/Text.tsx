import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { changeQuestionText } from "@/redux/questionSlice";
import Card from "../ui/custom/Card";

interface TextFieldType {
  id: string;
  question: string;
}

export default function TextField({ id, question }: TextFieldType) {
  const dispatch = useDispatch();

  return (
    <div className="w-full px-2">
      <Input
        type="text"
        placeholder="질문을 입력해주세요"
        value={question}
        onChange={(e) =>
          dispatch(changeQuestionText({ id, text: e.target.value }))
        }
      />
    </div>
  );
}
