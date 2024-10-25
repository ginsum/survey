import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { answerType } from "@/constants";
import { getId } from "@/lib/id";
import { addQuestion } from "@/redux/questionSlice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";

const textType = ["singleLineText", "multiLineText"];

export default function AddQuestion() {
  const dispatch = useDispatch();

  const getNewQuestion = (type: string) => {
    if (textType.includes(type)) {
      return {
        id: getId(),
        type,
        question: "",
        required: false,
      };
    } else {
      return {
        id: getId(),
        type,
        question: "",
        options: [""],
        required: false,
      };
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="">
        <div className="w-[130px] h-9 py-2 rounded-md text-sm bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90">
          질문 추가하기
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>질문 추가하기</DialogTitle>
        <DialogDescription>질문 타입을 선택해 주세요.</DialogDescription>

        <div className="flex flex-wrap justify-center gap-3">
          {answerType.map(({ id, label }) => (
            <DialogClose key={id} asChild>
              <Button
                variant="outline"
                onClick={() => dispatch(addQuestion(getNewQuestion(id)))}
              >
                {label}
              </Button>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
