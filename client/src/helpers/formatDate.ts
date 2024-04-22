import moment from "moment";
import "moment/locale/es"; // Importa el idioma español

// Función para formatear la fecha en el formato deseado
export const formatDate = (dateString) => {
  const localizedMoment = moment(dateString).locale("es");
  return localizedMoment.format("DD MMM");
};
