export const getMetricsForToday = (data, currentDate: string) => {
  return data
    .map((item) => {
      const dailySurvey = item.daily_survey;

      for (const date in dailySurvey) {
        // Obtener solo la parte de la fecha
        const surveyDate = date.split(" ")[0];

        if (surveyDate === currentDate) {
          const { self_satisfaction, team_collaboration, work_engagement, workspace } = dailySurvey[date];

          return {
            self_satisfaction,
            team_collaboration,
            work_engagement,
            workspace,
          };
        }
      }

      return null;
    })
    .filter((item) => item !== null);
};
