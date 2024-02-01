import api from "./apiToken";

export const getTeamData = async (teamId: string, sprint) => {
  const team = await api.get("/api/team?team_id=" + teamId);
  console.log(team);

  const response = await api.get(`/api/data/dashboard-data/${teamId}/${team.data.sprint}`);
  console.log(response);
  console.log(response.data.longRecommendation);

  return response.data;
};
