import Card from "./Card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "@/components/ui/switch";
import { answerType } from "@/constants";

export default function SideInfo() {
  return (
    <Card className="w-[240px]">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {answerType.map(({ id, label }) => (
            <SelectItem key={id} value={id}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-1">
        <Button variant="outline">복제</Button>
        <Button variant="outline">삭제</Button>
        <div className="flex flex-col justify-center items-center gap-0.5">
          <Switch />
          <div className="text-xs">필수</div>
        </div>
      </div>
    </Card>
  );
}
