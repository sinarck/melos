// store.js
import create from 'zustand';

const useAnswerStore = create((set) => ({
  answers: {},
  setAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer }
  })),
}));

export default useAnswerStore;
