import { SurveyLayout } from "../../layaout";
import { Questions } from "../components/Questions";

export const Survey = ({ team_id, token }) => {
  return (
    <SurveyLayout>
      <Questions team_id={team_id} token={token} />
    </SurveyLayout>
  );
};
