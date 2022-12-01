export const generateRandomRating = (min, max) => {
  return Math.round((Math.random() * (max - min + 1) + min) * 1e1) / 1e1;
};

export const generateRandomRatingAmount = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
