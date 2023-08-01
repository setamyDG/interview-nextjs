import { Question } from '@customTypes/question';

export type Props = {
  question: Question;
  onDelete: () => void;
  onEdit: () => void;
  actionsVisible: boolean;
};
