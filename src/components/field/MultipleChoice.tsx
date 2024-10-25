import { useDispatch } from "react-redux";

import {
  addOptionText,
  changeOptionText,
  changeQuestionText,
  removeOptionText,
} from "@/redux/questionSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Card from "../Card";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface MultipleChoiceType {
  id: string;
  question: string;
  options?: string[];
  type: string;
}

export default function MultipleChoiceField({
  id,
  question,
  options = [],
  type,
}: MultipleChoiceType) {
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
      <div className="w-full flex flex-col items-center gap-2 mt-4 pl-3">
        {options.map((text, index) => (
          <div key={`${id}-${index}`} className="flex w-full justify-between">
            <div className="flex w-full items-center gap-1">
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
                      optionIndex: index,
                    })
                  )
                }
              />
            </div>

            {options.length > 1 && (
              <Button
                variant="ghost"
                onClick={() =>
                  dispatch(removeOptionText({ id, optionIndex: index }))
                }
              >
                X
              </Button>
            )}
          </div>
        ))}

        <Button
          className="w-[130px] mt-2"
          variant="outline"
          onClick={() => dispatch(addOptionText({ id }))}
        >
          옵션 추가
        </Button>
      </div>
    </Card>
  );
}
