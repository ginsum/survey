import { useState } from "react";

import Questions from "./components/field/Questions";
import TitleField from "./components/field/Title";
import Preview from "./components/preview/Preview";
import { Button } from "./components/ui/button";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="w-screen flex justify-center mx-auto">
      <div className="flex w-full max-w-[720px] flex-col p-6 gap-4">
        {!open ? (
          <>
            <div className="w-full flex justify-end">
              <Button variant={"ghost"} onClick={() => setOpen(true)}>
                미리보기
              </Button>
            </div>
            <TitleField />
            <Questions />
          </>
        ) : (
          <>
            <div className="w-full flex justify-end">
              <Button variant={"ghost"} onClick={() => setOpen(false)}>
                돌아가기
              </Button>
            </div>
            <Preview />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
