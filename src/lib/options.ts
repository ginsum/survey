import { OptionType } from "@/type";

export const findOptionId = (
  options: OptionType[] | undefined,
  value: string
) => {
  const findOption = options?.find(({ text }) => text === value);
  return findOption?.id;
};
