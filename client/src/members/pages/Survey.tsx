import { SurveyLayout } from "../../layaout";
import { Questions } from "../components/Questions";

export const Survey = ({ token, team_id, user_id }) => {
  return (
    <SurveyLayout>
      <Questions token={token} team_id={team_id} user_id={user_id} />
    </SurveyLayout>
  );
};
