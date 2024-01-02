import api from "./apiToken";

export const getTeamData = async (teamId: string) => {
  const response = await api.get(`/analytics/${teamId}`);
  console.log(response);

  return response.data;
};
