export interface OptionType {
  id: string;
  text: string;
}

export interface QuestionType {
  id: string;
  type: string;
  question: string;
  options?: OptionType[];
  required: boolean;
}

export interface ChangeQuestionTextType {
  id: string;
  text: string;
}

export interface ChangeOptionTextType {
  id: string;
  optionId: string;
  text: string;
}
