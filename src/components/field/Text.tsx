import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { changeQuestionText } from "@/redux/questionSlice";
import Card from "../Card";

interface TextFieldType {
  id: string;
  question: string;
}

export default function TextField({ id, question }: TextFieldType) {
  const dispatch = useDispatch();

  return (
    <Card className="w-full">
      <Input
        type="text"
        placeholder="질문을 입력해주세요"
        value={question}
        onChange={(e) =>
          dispatch(changeQuestionText({ id, text: e.target.value }))
        }
      />
    </Card>
  );
}
