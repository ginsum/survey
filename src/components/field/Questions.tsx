import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SideInfo from "../SideInfo";
import MultipleChoiceField from "./MultipleChoice";
import TextField from "./Text";
import AddQuestion from "../AddQuestion";

const textType = ["singleLineText", "multiLineText"];

export default function Questions() {
  const { list } = useSelector((state: RootState) => state.questions);

  return (
    <div className="flex flex-col items-center gap-3">
      {list.map(({ id, type, required, question, options }, index) => {
        return (
          <div key={id} className="flex w-full gap-2">
            {textType.includes(type) ? (
              <TextField id={id} question={question} />
            ) : (
              <MultipleChoiceField
                id={id}
                question={question}
                options={options}
                type={type}
              />
            )}
            <SideInfo
              id={id}
              type={type}
              required={required}
              questionIndex={index}
            />
          </div>
        );
      })}
      <AddQuestion />
    </div>
  );
}
