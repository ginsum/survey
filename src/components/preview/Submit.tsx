import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface SubmitModalType {
  list: { id: string; question: string; answer: string }[];
}

export default function SubmitModal({ list }: SubmitModalType) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="w-[130px] h-9 py-1.5 rounded-lg text-sm bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90">
          제출하기
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>제출이 완료되었습니다</DialogTitle>
        <DialogDescription>작성하신 내용은 아래와 같습니다</DialogDescription>

        <div className="flex flex-col flex-wrap justify-center gap-3">
          {list.map(({ id, question, answer }) => (
            <div key={id} className="flex flex-col border-b pb-2 gap-1">
              <div>{question}</div>
              <div className="text-sm pl-1">{answer}</div>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center">
          <DialogClose asChild>
            <Button variant="outline" className="w-[140px]">
              확인
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
