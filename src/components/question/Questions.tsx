import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import SideInfo from "./SideInfo";
import MultipleChoiceField from "../field/MultipleChoice";
import TextField from "../field/Text";
import AddQuestion from "./AddQuestion";
import Card from "../ui/custom/Card";
import { textType } from "@/lib/contants";

export default function Questions() {
  const { list } = useSelector((state: RootState) => state.questions);

  return (
    <div className="flex flex-col items-center gap-3">
      {list.map(({ id, type, required, question, options }, index) => {
        return (
          <Card key={id} className="w-full">
            <div className="flex">
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
          </Card>
        );
      })}
      <AddQuestion />
    </div>
  );
}
