import api from "./apiToken";

export const getTeamData = async (teamId: string, members) => {
  const team = await api.get("/api/team?team_id=" + teamId);
  console.log(members);

  const response = await api.get(`/api/data/dashboard-data/${teamId}/${team.data.sprint}/${members}`);
  return response.data;
};
