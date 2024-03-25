export const formattedDate = (date) => {
  const dateObject = new Date(date);

  const day = dateObject.getUTCDate().toString().padStart(2, "0");
  const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getUTCFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
