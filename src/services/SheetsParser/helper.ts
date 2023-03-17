export const parseText = (text: string): string => {
  if(!text || text.length < 0) return "";
  text = parseItalic(text);
  text = parseBold(text);
  text = parseUnderline(text);
  return text;
};

export const parseItalic = (text: string): string => {
  const regex = /&i&([^&]*)&i\/&/g;
  return text.replace(regex, "<i>$1</i>");
};

export const parseBold = (text: string): string => {
  const regex = /&b&([^&]*)&b\/&/g;
  return text.replace(regex, "<b>$1</b>");
};

export const parseUnderline = (text: string): string => {
  const regex = /&u&([^&]*)&u\/&/g;
  return text.replace(regex, "<u>$1</u>");
};
