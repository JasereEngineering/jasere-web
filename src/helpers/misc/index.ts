export const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const playerColours = [
  "#FBD2D3",
  "#D6BDF8",
  "#F89698",
  "#B6D9F6",
  "#D7C1BD",
  "#7EAED6",
];
