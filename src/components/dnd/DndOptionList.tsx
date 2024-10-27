import { useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { OptionType } from "@/type";
import DndOption from "./DndOption";

export default function DndOptionList({
  options,
  type,
  id,
}: {
  options: OptionType[];
  type: string;
  id: string;
}) {
  const renderOption = useCallback(
    (option: OptionType) => {
      return (
        <DndOption
          key={option.id}
          id={id}
          optionId={option.id}
          text={option.text}
          type={type}
          hasDelete={options.length > 1}
        />
      );
    },
    [options]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex flex-col items-center gap-2 mt-4">
        {options.map((option) => renderOption(option))}
      </div>
    </DndProvider>
  );
}
