export const convertDateToUTCString = date => {
  var theDate = new Date(date * 1000);
  return theDate.toUTCString();
};
