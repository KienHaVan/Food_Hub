import dayjs from 'dayjs';

export const formatPrice = (price) => {
  return price.toFixed(2);
};

export const formatRating = (rating) => {
  return rating.toFixed(1);
};

export const formatDate = (date) => {
  return dayjs(date).format('DD/MM/YYYY');
};
