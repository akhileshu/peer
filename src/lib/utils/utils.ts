

export const getPreviewText = (content: string, length = 100) =>
  content?.length > length ? `${content.slice(0, length)}...` : content;

export const formatDate = (date: Date) => new Date(date).toLocaleDateString();

export const APP_SETTINGS = {
  isProd: process.env.NODE_ENV === "production",
  limits: {
    POSTS_CREATE: 10,
    POSTS_UPDATE: 50,
    MAX_BOOKMARKS: 50,
  },
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unexpected error occurred.";
}
