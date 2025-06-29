import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { OptionTextType, ChangeQuestionTextType, QuestionType } from "@/type";
import { getId } from "@/lib/id";
import { textType } from "@/lib/contants";

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
    changeOptionText: (state, action: PayloadAction<OptionTextType>) => {
      const sliceQuestions = [...state.list];
      const updateQuestions = sliceQuestions.map((el) => {
        if (action.payload.id === el.id) {
          if (el.options) {
            const updateOptions = [...el.options];
            const findOptionIndex = updateOptions.findIndex(
              ({ id }) => id === action.payload.optionId
            );
            updateOptions[findOptionIndex] = {
              ...updateOptions[findOptionIndex],
              text: action.payload.text,
            };
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
            return {
              ...el,
              options: [
                ...el.options,
                { id: `${action.payload.id}-${getId()}`, text: "" },
              ],
            };
          }
        }
        return el;
      });
      state.list = updateQuestions;
    },
    removeOptionText: (
      state,
      action: PayloadAction<{ id: string; optionId: string }>
    ) => {
      const sliceQuestions = [...state.list];
      const updateQuestions = sliceQuestions.map((el) => {
        if (action.payload.id === el.id) {
          if (el.options) {
            const updateOptions = el.options.filter(
              ({ id }) => id !== action.payload.optionId
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
      const findQuestion = sliceQuestions[action.payload.questionIndex];
      let updateQuestion;
      if (textType.includes(findQuestion.type)) {
        updateQuestion = { ...findQuestion, id: getId() };
      } else {
        const newId = getId();
        const newOption = findQuestion.options?.map((el) => {
          return { ...el, id: `${newId}-${getId()}` };
        });

        updateQuestion = { ...findQuestion, id: newId, options: newOption };
      }

      sliceQuestions.splice(
        action.payload.questionIndex + 1,
        0,
        updateQuestion
      );
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
    changeQuestionType: (
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) => {
      const sliceQuestions = [...state.list];
      const updateQuestions = sliceQuestions.map((el) => {
        if (action.payload.id === el.id) {
          if (textType.includes(action.payload.type)) {
            return {
              ...el,
              type: action.payload.type,
              question: "",
              required: false,
            };
          } else {
            return {
              ...el,
              type: action.payload.type,
              question: "",
              options: [{ id: `${action.payload.id}-${getId()}`, text: "" }],
              required: false,
            };
          }
        }
        return el;
      });

      state.list = updateQuestions;
    },
    moveOption: (
      state,
      action: PayloadAction<{ id: string; fromId: string; toId: string }>
    ) => {
      const sliceQuestions = [...state.list];
      const updateQuestions = sliceQuestions.map((el) => {
        if (action.payload.id === el.id) {
          if (el.options) {
            const updatedOptions = [...el.options];
            const findFromIndex = updatedOptions.findIndex(
              ({ id }) => id === action.payload.fromId
            );
            const findToIndex = updatedOptions.findIndex(
              ({ id }) => id === action.payload.toId
            );
            const [movedOption] = updatedOptions.splice(findFromIndex, 1);
            updatedOptions.splice(findToIndex, 0, movedOption);
            return { ...el, options: updatedOptions };
          }
        }
        return el;
      });
      state.list = updateQuestions;
    },
    moveQuestion: (
      state,
      action: PayloadAction<{ id: string; fromId: string; toId: string }>
    ) => {
      const sliceQuestions = [...state.list];
      const findFromIndex = sliceQuestions.findIndex(
        ({ id }) => id === action.payload.fromId
      );
      const findToIndex = sliceQuestions.findIndex(
        ({ id }) => id === action.payload.toId
      );
      const [movedQuestion] = sliceQuestions.splice(findFromIndex, 1);
      sliceQuestions.splice(findToIndex, 0, movedQuestion);

      state.list = sliceQuestions;
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
  changeQuestionType,
  moveOption,
  moveQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
