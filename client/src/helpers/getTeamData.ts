import api from "./apiToken";

export const getTeamData = async (teamId: string) => {
  const response = await api.get(`/api/data/dashboard-data/${teamId}`);
  console.log(response);

  return response.data;
};
