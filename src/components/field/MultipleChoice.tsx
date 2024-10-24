import { useState } from "react";

import Card from "../Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MultipleChoiceField() {
  const [options, setOptions] = useState([""]);

  const handleOptionChange = (text: string, index: number) => {
    const updateOptions = [...options];
    updateOptions[index] = text;
    setOptions(updateOptions);
  };
  const addOption = () => {
    setOptions([...options, ""]);
  };
  const removeOption = (optionIndex: number) => {
    const filterOptions = options.filter(
      (_text, index) => index !== optionIndex
    );
    setOptions(filterOptions);
    // TODO: 하나만 남았을때 처리
  };

  return (
    <Card className="w-full">
      <Input type="text" placeholder="질문을 입력해주세요" />
      <div className="w-full flex flex-col items-center gap-2 mt-4">
        {options.map((text, index) => (
          <div key={`${index}-${text}`} className="flex w-full justify-between">
            <Input
              type="text"
              placeholder="옵션을 입력해주세요"
              value={text}
              onChange={(e) => handleOptionChange(e.target.value, index)}
            />
            <Button variant="ghost" onClick={() => removeOption(index)}>
              삭제
            </Button>
          </div>
        ))}

        <Button
          className="w-[160px] mt-2"
          variant="outline"
          onClick={addOption}
        >
          옵션 추가
        </Button>
      </div>
    </Card>
  );
}
