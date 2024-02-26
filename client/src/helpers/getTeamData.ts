import api from "./apiToken";

export const getTeamData = async (teamId: string, sprint) => {
  const team = await api.get("/api/team?team_id=" + teamId);
  const response = await api.get(`/api/data/dashboard-data/${teamId}/${team.data.sprint}`);
  return response.data;
};
