import { create } from "zustand";
// Define the interface for the store
interface AnswerStore {
  answers: (string | undefined)[];
  addAnswer: (answer: string) => void;
}
// Create the store with correct types
const useAnswerStore = create<AnswerStore>((set) => ({
  answers: [],
  // Typing the 'answer' parameter as a string
  addAnswer: (answer: string) =>
    set((state: AnswerStore) => ({
      answers: [...state.answers, answer], // 'state' is of type AnswerStore
    })),
}));
export default useAnswerStore;