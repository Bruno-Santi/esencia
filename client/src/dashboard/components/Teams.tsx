import React, { useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { TeamList } from "./TeamList";
import { List } from "@mui/material";

export const Teams: React.FC = () => {
  const { userTeams } = useDashboard();
  useEffect(() => {
    console.log(userTeams);
  }, [userTeams]);

  return (
    <List>
      {userTeams?.map(({ _id, name, logo, sprint }: { _id: number; name: string; logo: string }) => (
        <TeamList key={_id} id={_id} name={name} logo={logo} sprint={sprint} />
      ))}
    </List>
  );
};
