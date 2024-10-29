import { useSelector, useDispatch } from "react-redux";
import Card from "../Card";
import { Input } from "@/components/ui/input";
import { changeTitle, changeDesc } from "@/redux/titleSlice";
import { RootState } from "@/redux/store";

export default function TitleField() {
  const { title, description } = useSelector((state: RootState) => state.title);
  const dispatch = useDispatch();

  return (
    <Card>
      <Input
        type="text"
        className="text-lg h-12"
        placeholder="설문지 제목을 입력해주세요"
        value={title}
        onChange={(e) => dispatch(changeTitle(e.target.value))}
      />
      <Input
        type="text"
        className="text-sm h-9"
        placeholder="설문지 설명을 입력해주세요"
        value={description}
        onChange={(e) => dispatch(changeDesc(e.target.value))}
      />
    </Card>
  );
}
