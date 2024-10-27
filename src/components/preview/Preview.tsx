import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import Card from "../Card";
import { Input } from "../ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import SubmitModal from "./Submit";

export default function Preview() {
  const { title, description } = useSelector((state: RootState) => state.title);
  const { list } = useSelector((state: RootState) => state.questions);
  const [answers, setAnswers] = useState<
    { id: string; question: string; answer: string }[]
  >([]);

  useEffect(() => {
    if (list.length) {
      const answerList = list.map(({ id, question }) => {
        return { id, question, answer: "" };
      });
      setAnswers(answerList);
    }
  }, [list]);

  const getAnswer = (questionId: string) => {
    const findAnswer = answers.find(({ id }) => id === questionId);
    return findAnswer?.answer || "";
  };

  const changeAnswer = ({ id, text }: { id: string; text: string }) => {
    const updateAnswers = answers.map((el) => {
      if (id === el.id) {
        return { ...el, answer: text };
      }
      return el;
    });
    setAnswers(updateAnswers);
  };

  const resetAnswer = () => {
    const updateAnswers = answers.map((el) => {
      return { ...el, answer: "" };
    });

    setAnswers(updateAnswers);
  };

  const changeCheckboxAnswer = ({ id, text }: { id: string; text: string }) => {
    const findAnswer = getAnswer(id);

    if (findAnswer === "") {
      changeAnswer({ id, text });
      return;
    }
    const splitAnswer = findAnswer.split(",");

    if (splitAnswer.includes(text)) {
      const updateAnswer = splitAnswer.filter(
        (answerText) => answerText !== text
      );

      changeAnswer({ id, text: updateAnswer.join(",") });
    } else {
      changeAnswer({ id, text: `${findAnswer},${text}` });
    }
  };

  return (
    <div className="flex flex-col pb-8 gap-6">
      <Card>
        <div>{title}</div>
        <div>{description}</div>
        <hr />
        <div className="text-sm text-red-600">* 표시는 필수 질문임</div>
      </Card>
      {list.map(({ id, question, type, options, required }) => (
        <Card key={id}>
          <div className="flex gap-1">
            <div>{question}</div>
            {required && <div className="text-red-600">*</div>}
          </div>

          {type === "singleLineText" && (
            <Input
              className="w-[300px]"
              value={getAnswer(id)}
              onChange={(e) => changeAnswer({ id, text: e.target.value })}
            />
          )}
          {type === "multiLineText" && (
            <Textarea
              placeholder="Type your message here."
              value={getAnswer(id)}
              onChange={(e) => changeAnswer({ id, text: e.target.value })}
            />
          )}
          {type === "multipleChoice" && (
            <RadioGroup
              onValueChange={(value) => changeAnswer({ id, text: value })}
            >
              <div className="flex flex-col gap-2">
                {options?.map(({ id: optionId, text }) => (
                  <div key={optionId} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={text}
                      id={optionId}
                      checked={getAnswer(id) === text}
                    />
                    <label
                      htmlFor={optionId}
                      className="text-sm font-medium leading-none"
                    >
                      {text}
                    </label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}
          {type === "checkbox" && (
            <div className="flex flex-col gap-2">
              {options?.map(({ id: optionId, text }) => (
                <div key={optionId} className="flex items-center space-x-2">
                  <Checkbox
                    id={optionId}
                    checked={getAnswer(id).split(",").includes(text)}
                    onCheckedChange={() => changeCheckboxAnswer({ id, text })}
                  />
                  <label
                    htmlFor={optionId}
                    className="text-sm font-medium leading-none"
                  >
                    {text}
                  </label>
                </div>
              ))}
            </div>
          )}
          {type === "dropdown" && (
            <Select
              onValueChange={(value) => changeAnswer({ id, text: value })}
              value={getAnswer(id)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={"선택"} />
              </SelectTrigger>
              <SelectContent>
                {options?.map(({ id: optionId, text }) => (
                  <SelectItem key={optionId} value={text}>
                    {text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </Card>
      ))}
      <div className="flex w-full justify-center gap-2">
        <SubmitModal list={answers} />
        <Button variant={"outline"} className="w-[130px]" onClick={resetAnswer}>
          양식 지우기
        </Button>
      </div>
    </div>
  );
}
