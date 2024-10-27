import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  changeOptionText,
  moveOption,
  removeOptionText,
} from "@/redux/questionSlice";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function DndOption({
  id,
  text,
  type,
  hasDelete,
  optionId,
}: {
  id: string;
  optionId: string;
  text: string;
  type: string;
  hasDelete: boolean;
}) {
  const dispatch = useDispatch();

  const [, drag, preview] = useDrag(() => ({
    type: "option",
    item: { optionId },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));

  const [, drop] = useDrop({
    accept: "option",
    hover: (draggedItem: any) => {
      const dragId = draggedItem.optionId;
      const hoverId = optionId;

      if (dragId === hoverId) {
        return;
      }

      dispatch(moveOption({ id, fromId: dragId, toId: hoverId }));
    },
  });

  return (
    <div ref={preview} className="flex w-full justify-between">
      <div className="flex w-full items-center gap-1">
        <div ref={drop}>
          <div ref={drag} className="w-4 h-6 bg-slate-200"></div>
        </div>
        {type === "checkbox" && <Checkbox disabled />}
        {type === "multipleChoice" && (
          <RadioGroup>
            <RadioGroupItem value="" disabled />
          </RadioGroup>
        )}
        <Input
          type="text"
          placeholder="옵션을 입력해주세요"
          value={text}
          onChange={(e) =>
            dispatch(
              changeOptionText({
                id,
                text: e.target.value,
                optionId,
              })
            )
          }
        />
      </div>
      {hasDelete && (
        <Button
          variant="ghost"
          onClick={() => dispatch(removeOptionText({ id, optionId }))}
        >
          X
        </Button>
      )}
    </div>
  );
}
