import React from "react";
import { TeamListProps } from "../../interface/index";
import { useDashboard } from "../../hooks/useDashboard";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export const TeamList: React.FC<TeamListProps> = ({ id, name, logo, sprint }) => {
  const { startSettingActiveTeam, activeTeam, closeModal } = useDashboard();
  const isActive = activeTeam?._id === id;
  console.log(logo);

  return (
    <ListItem button selected={isActive} onClick={() => startSettingActiveTeam(id)}>
      <ListItemIcon>
        <Avatar src={logo} alt={name} />
      </ListItemIcon>
      <span className='dark:text-tertiary'>
        {" "}
        <ListItemText primary={name} />
      </span>
    </ListItem>
  );
};
