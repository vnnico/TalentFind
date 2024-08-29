const dateConvert = (date) => {
  // Convert the date string to a JavaScript Date object
  const dateObject = new Date(date);

  // Format the Date object to YYYY-MM-DD format
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const day = String(dateObject.getDate()).padStart(2, "0");

  // Combine to form YYYY-MM-DD format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export default dateConvert;
