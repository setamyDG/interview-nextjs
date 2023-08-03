export type Props = {
  createQuestion?: (data: FormData) => Promise<void>;
  updateQuestion?: (data: FormData) => Promise<void>;
};
