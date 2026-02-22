import { create } from "zustand";

type Result = {
  filler_count: number;
  clarity: number;
  star_score: number;
};

type InterviewState = {
  questions: string[];
  currentIndex: number;
  results: Result[];

  setQuestions: (questions: string[]) => void;
  nextQuestion: () => void;
  addResult: (result: Result) => void;
  reset: () => void;
};

export const useInterviewStore = create<InterviewState>((set) => ({
  questions: [],
  currentIndex: 0,
  results: [
    { clarity: 8, star_score: 7, filler_count: 3 },
    { clarity: 7, star_score: 8, filler_count: 2 },
  ], // dummy data for testing

  // results: [],  for backend

  setQuestions: (questions) =>
    set({
      questions,
      currentIndex: 0,
      results: [],
    }),

  nextQuestion: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),

  addResult: (result) =>
    set((state) => ({
      results: [...state.results, result],
    })),

  reset: () =>
    set({
      questions: [],
      currentIndex: 0,
      results: [],
    }),
}));
