import api from "../../helpers/apiToken";
import { toast } from "react-toastify";

export const useCreateRetro = () => {
  const createLocalStorage = (token, team_id, scrum_id) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("team_id", team_id);
    localStorage.setItem("scrum_id", scrum_id);
  };
  const handleNewRetro = async (token, team_id, scrum_id) => {
    console.log(token, team_id, scrum_id);
    createLocalStorage(token, team_id, scrum_id);
    // await sendMail(team_id);
    toast.promise(createRetro(token, team_id, scrum_id), {
      pending: "Creando retro... ⏳",
      success: "Retro creada. Redireccionando...🚀",
      error: "Error al crear retro ☹️",
    });
  };
  // const sendMail = async (team_id: string) => {
  //   try {
  //     const response = await api.get(`/api/retro-email/${team_id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const createRetro = async (token, team_id, scrum_id) => {
    console.log("holasd");

    try {
      const response = await api.post("/api/retro-email/create", { token, team_id, scrum_id });

      console.log(response);

      setTimeout(() => {
        window.location.href = response.data;
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleNewRetro,
  };
};
