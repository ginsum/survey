import Card from "../Card";
import { Input } from "@/components/ui/input";

export default function TitleField() {
  return (
    <Card>
      <Input type="text" placeholder="설문지 제목을 입력해주세요" />
      <Input type="text" placeholder="설문지 설명을 입력해주세요" />
    </Card>
  );
}
