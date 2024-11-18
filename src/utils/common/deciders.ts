import { DIFFICULTY_STATUS, TARGET_STATUS } from "@/constant/enums";

export const targetStatusDecider = (status?: string) => {
  switch (status) {
    case TARGET_STATUS.FINISHED:
      return "تمام شده";
    case TARGET_STATUS.PENDING:
      return "در حال انجام";
  }
};

export const targetDifficultyDecider = (status?: string) => {
  switch (status) {
    case DIFFICULTY_STATUS.DIFFICULT:
      return "دشوار";
    case DIFFICULTY_STATUS.EASY:
      return "راحت";
    case DIFFICULTY_STATUS.HARD:
      return "سخت";
  }
};
