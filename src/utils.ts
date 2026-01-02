export const normalizeText = (text?: string): string | undefined => {
  if (!text) return undefined;

  return text
    .replaceAll("“", '"')
    .replaceAll("’", "'")
    .replaceAll("'", "'")
    .replaceAll("”", '"')
    .replaceAll("‘", "'");
};
