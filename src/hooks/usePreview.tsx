import { RootState } from "@/redux/store";
import { OptionTextType, OptionType } from "@/type";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function usePreview() {
  const { list } = useSelector((state: RootState) => state.questions);
  const [answers, setAnswers] = useState<
    {
      id: string;
      question: string;
      answer: string;
      required: boolean;
      type: string;
      answerOptionId: string[];
    }[]
  >([]);

  useEffect(() => {
    if (list.length) {
      const answerList = list.map(({ id, question, required, type }) => {
        return { id, question, required, answer: "", type, answerOptionId: [] };
      });
      setAnswers(answerList);
    }
  }, [list]);

  const getAnswerText = (questionId: string) => {
    const findAnswer = answers.find(({ id }) => id === questionId);
    return findAnswer?.answer || "";
  };

  const getAnswerOptionId = (questionId: string) => {
    const findAnswer = answers.find(({ id }) => id === questionId);
    return findAnswer?.answerOptionId || [];
  };

  const changeTextAnswer = ({ id, text }: OptionType) => {
    const updateAnswers = answers.map((el) => {
      if (id === el.id) {
        return { ...el, answer: text };
      }
      return el;
    });
    setAnswers(updateAnswers);
  };

  const changeOptionAnswer = ({ id, text, optionId }: OptionTextType) => {
    const updateAnswers = answers.map((el) => {
      if (id === el.id) {
        return {
          ...el,
          answer: text,
          answerOptionId: [...el.answerOptionId, optionId],
        };
      }
      return el;
    });
    setAnswers(updateAnswers);
  };

  const changeCheckboxAnswer = ({ id, text, optionId }: OptionTextType) => {
    const findAnswer = getAnswerText(id);
    const findAnswerOptionId = getAnswerOptionId(id);

    if (findAnswer === "") {
      changeOptionAnswer({ id, text, optionId });
      return;
    }

    if (findAnswerOptionId.includes(optionId)) {
      const splitAnswer = findAnswer.split(",");
      const updateAnswer = splitAnswer.filter(
        (answerText) => answerText !== text
      );
      const updateOptionId = findAnswerOptionId.filter(
        (answerId) => answerId !== optionId
      );
      const updateAnswers = answers.map((el) => {
        if (id === el.id) {
          return {
            ...el,
            answer: updateAnswer.join(","),
            answerOptionId: updateOptionId,
          };
        }
        return el;
      });
      setAnswers(updateAnswers);
    } else {
      changeOptionAnswer({ id, text: `${findAnswer},${text}`, optionId });
    }
  };

  const resetAnswer = () => {
    const updateAnswers = answers.map((el) => {
      return { ...el, answer: "" };
    });

    setAnswers(updateAnswers);
  };

  return {
    list,
    answers,
    getAnswerText,
    getAnswerOptionId,
    changeTextAnswer,
    changeOptionAnswer,
    changeCheckboxAnswer,
    resetAnswer,
  };
}
