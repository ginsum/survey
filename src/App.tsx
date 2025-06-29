import { useState } from "react";

import Questions from "./components/question/Questions";
import TitleField from "./components/field/Title";
import Preview from "./components/preview/Preview";
import { Button } from "./components/ui/button";
import SideMenu from "./components/question/QuestionList";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="relative w-screen h-full flex justify-center">
      {!open ? (
        <div className="w-full h-full max-w-[780px] p-6 gap-4">
          <div className="w-full flex justify-end">
            <Button variant={"ghost"} onClick={() => setOpen(true)}>
              미리보기
            </Button>
          </div>
          <div className="flex w-full 2xl:h-full h-screen flex-col p-6 gap-4 overflow-auto">
            <TitleField />
            <Questions />
          </div>
          <SideMenu />
        </div>
      ) : (
        <div className="flex w-full h-full max-w-[840px] flex-col  p-6 gap-4">
          <div className="w-full flex justify-end">
            <Button variant={"ghost"} onClick={() => setOpen(false)}>
              돌아가기
            </Button>
          </div>
          <Preview />
        </div>
      )}
    </div>
  );
}

export default App;
