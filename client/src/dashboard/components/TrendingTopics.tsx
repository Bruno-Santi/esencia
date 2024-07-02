import React from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { UsePaginationTopics } from "../../helpers/UsePaginationTopics";
import { IconButton, Tooltip, Paper, Typography, Box, Divider, List, ListItem } from "@mui/material";
import { CiCircleQuestion } from "react-icons/ci";

export const TrendingTopics = () => {
  const { topics } = useDashboard();

  if (!topics.length)
    return (
      <Paper elevation={0} className='p-2 h-3/4  flex justify-center items-center'>
        <Typography variant='h7' color='textSecondary'>
          Sin tópicos aún.
        </Typography>
      </Paper>
    );

  return (
    <Paper elevation={0} className='p-2 h-fit'>
      <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}></Box>
      <Divider />
      <List>
        <UsePaginationTopics topics={topics} />
      </List>
    </Paper>
  );
};
