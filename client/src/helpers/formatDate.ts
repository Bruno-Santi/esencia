import moment from "moment";

export const formatDate = (dateString) => {
  const newDate = moment(dateString).add(1, "day");
  return newDate.format("DD/MM/YYYY");
};
