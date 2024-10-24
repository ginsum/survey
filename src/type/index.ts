export interface QuestionType {
  id: string;
  type: string;
  question: string;
  options?: string[];
  required: boolean;
  textAnswer?: string;
  optionAnswer?: string;
}

export interface ChangeQuestionTextType {
  id: string;
  text: string;
}

export interface ChangeOptionTextType {
  id: string;
  optionIndex: number;
  text: string;
}
