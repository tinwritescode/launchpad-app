export const formatNumber = (number: string) => {
  return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
