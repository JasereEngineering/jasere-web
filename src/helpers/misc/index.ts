import avatar1 from "../../assets/images/avatar1.png";
import avatar2 from "../../assets/images/avatar2.png";
import avatar3 from "../../assets/images/avatar3.png";
import avatar4 from "../../assets/images/avatar4.png";
import avatar5 from "../../assets/images/avatar5.png";
import avatar6 from "../../assets/images/avatar6.png";
import avatar7 from "../../assets/images/avatar7.png";
import avatar8 from "../../assets/images/avatar8.png";
import avatar9 from "../../assets/images/avatar9.png";
import avatar10 from "../../assets/images/avatar10.png";
import avatar11 from "../../assets/images/avatar11.png";
import avatar12 from "../../assets/images/avatar12.png";
import avatar13 from "../../assets/images/avatar13.png";
import avatar14 from "../../assets/images/avatar14.png";
import avatar15 from "../../assets/images/avatar15.png";
import avatar16 from "../../assets/images/avatar16.png";

export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const delay = async (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Done");
    }, seconds * 1000);
  });
};

export const maskEmail = (email: string | null) => {
  if (!email) return "";
  const [localPart, domain] = email.split("@");
  const maskedLocal = localPart.slice(0, 3) + "*****";
  return `${maskedLocal}@${domain}`;
};

export const isValidEmail = (email: string) => {
  return /^[\w.+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate} | ${formattedTime}`;
};

export const numberToOrdinal = (num: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;

  return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

export const playerColours = [
  "#FBD2D3",
  "#D6BDF8",
  "#F89698",
  "#B6D9F6",
  "#D7C1BD",
  "#7EAED6",
];

export const avatarMap = {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  avatar13,
  avatar14,
  avatar15,
  avatar16,
};

export const colorMap = {
  charades: "#F34348",
  lemon: "#F34348",
  words: "#F34348",
  "scrambled-words": "#FF9B9D",
  correct: "#093B65",
};

export const titleMap = {
  charades: "charades",
  lemon: "lemon lemon",
  words: "what words?",
  "scrambled-words": "scrambled words",
  correct: "correct",
};

export const generateRandomLetters = (count: number): string => {
  return Array.from({ length: count }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26)),
  ).join("");
};

export const fillScrambled = (word: string, targetLength = 10): string => {
  if (!word) return "";
  if (word.length < targetLength) {
    const extraLettersNeeded = targetLength - word.length;
    return word + generateRandomLetters(extraLettersNeeded);
  }
  return word;
};
