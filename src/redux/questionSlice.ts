import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  ChangeOptionTextType,
  ChangeQuestionTextType,
  QuestionType,
} from "@/type";
import { getId } from "@/lib/id";

export interface QuestionState {
  list: QuestionType[];
}

const initialState: QuestionState = {
  list: [],
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<QuestionType>) => {
      state.list = [...state.list, action.payload];
    },
    changeQuestionText: (
      state,
      action: PayloadAction<ChangeQuestionTextType>
    ) => {
      const sliceQuestions = [...state.list];
      const updateQuestions = sliceQuestions.map((el) => {
        if (action.payload.id === el.id) {
          return { ...el, question: action.payload.text };
        }
        return el;
      });
      state.list = updateQuestions;
    },
    changeOptionText: (state, action: PayloadAction<ChangeOptionTextType>) => {
      const sliceQuestions = [...state.list];
      const updateQuestions = sliceQuestions.map((el) => {
        if (action.payload.id === el.id) {
          if (el.options) {
            const updateOptions = [...el.options];
            updateOptions[action.payload.optionIndex] = action.payload.text;
            return { ...el, options: updateOptions };
          }
        }
        return el;
      });
      state.list = updateQuestions;
    },
    addOptionText: (state, action: PayloadAction<{ id: string }>) => {
      const sliceQuestions = [...state.list];
      const updateQuestions = sliceQuestions.map((el) => {
        if (action.payload.id === el.id) {
          if (el.options) {
            return { ...el, options: [...el.options, ""] };
          }
        }
        return el;
      });
      state.list = updateQuestions;
    },
    removeOptionText: (
      state,
      action: PayloadAction<{ id: string; optionIndex: number }>
    ) => {
      const sliceQuestions = [...state.list];
      const updateQuestions = sliceQuestions.map((el) => {
        if (action.payload.id === el.id) {
          if (el.options) {
            const updateOptions = el.options.filter(
              (_text, index) => index !== action.payload.optionIndex
            );

            return { ...el, options: updateOptions };
          }
        }
        return el;
      });
      state.list = updateQuestions;
    },
    copyQuestion: (state, action: PayloadAction<{ questionIndex: number }>) => {
      const sliceQuestions = [...state.list];
      const sliceQuestion = {
        ...sliceQuestions[action.payload.questionIndex],
        id: getId(),
      };

      sliceQuestions.splice(action.payload.questionIndex + 1, 0, sliceQuestion);
      state.list = sliceQuestions;
    },
    removeQuestion: (state, action: PayloadAction<{ id: string }>) => {
      const updateQuestions = state.list.filter(
        (el) => el.id !== action.payload.id
      );
      state.list = updateQuestions;
    },
    changeRequired: (state, action: PayloadAction<{ id: string }>) => {
      const sliceQuestions = [...state.list];
      const updateQuestions = sliceQuestions.map((el) => {
        if (action.payload.id === el.id) {
          return { ...el, required: !el.required };
        }
        return el;
      });
      state.list = updateQuestions;
    },
  },
});

export const {
  addQuestion,
  changeQuestionText,
  changeOptionText,
  addOptionText,
  removeOptionText,
  copyQuestion,
  removeQuestion,
  changeRequired,
} = questionSlice.actions;

export default questionSlice.reducer;
