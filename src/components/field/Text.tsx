import Card from "../Card";
import { Input } from "@/components/ui/input";

export default function TextField() {
  return (
    <Card className="w-full">
      <Input type="text" placeholder="질문을 입력해주세요" />
    </Card>
  );
}
