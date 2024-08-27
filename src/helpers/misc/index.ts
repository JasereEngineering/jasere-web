import avatar1 from "../../assets/images/avatar1.svg";
import avatar2 from "../../assets/images/avatar2.svg";
import avatar3 from "../../assets/images/avatar3.svg";
import avatar4 from "../../assets/images/avatar4.svg";
import avatar5 from "../../assets/images/avatar5.svg";
import avatar6 from "../../assets/images/avatar6.svg";
import avatar7 from "../../assets/images/avatar7.svg";
import avatar8 from "../../assets/images/avatar8.svg";
import charades from "../../assets/images/charades.jpg";
import lemon from "../../assets/images/lemon.jpg";
import words from "../../assets/images/words.jpg";
import scrambled from "../../assets/images/scrambled.jpg";

export const shuffleArray = (array: string[]) => {
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
};

export const colorMap = {
  charades,
  lemon: "#F34348",
  words,
  "scrambled-words": "#FF9B9D",
};

export const titleMap = {
  charades: "charades",
  lemon: "lemon lemon",
  words: "what words?",
  "scrambled-words": "scrambled words",
};
