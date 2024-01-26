import api from "./apiToken";

export const getTeamData = async (teamId: string, sprint) => {
  const response = await api.get(`/api/data/dashboard-data/${teamId}/${sprint}`);
  console.log(response);

  return response.data;
};
