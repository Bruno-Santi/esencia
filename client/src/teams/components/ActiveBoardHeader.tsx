import React, { useState, useEffect } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { baseURL } from "../../helpers/apiToken";

export const ActiveBoardHeader = ({ activeBoard }) => {
  const { activeTeam } = useDashboard();
  const [startDate, setStartDate] = useState(new Date(activeBoard[0].start_date));
  const [endDate, setEndDate] = useState(new Date(activeBoard[0].end_date));

  useEffect(() => {
    setStartDate(new Date(activeBoard[0].start_date));
    setEndDate(new Date(activeBoard[0].end_date));
  }, [activeBoard]);

  const handleStartDateChange = async (newDate) => {
    setStartDate(newDate);
    if (newDate > endDate) {
      setEndDate(newDate); // Ajustar la fecha de fin si es necesario
      await updateBoardDates(newDate, newDate);
    } else {
      await updateBoardDates(newDate, endDate);
    }
  };

  const handleEndDateChange = async (newDate) => {
    setEndDate(newDate);
    await updateBoardDates(startDate, newDate);
  };

  const updateBoardDates = async (start, end) => {
    try {
      await axios.put(baseURL + `/api/boards/dates/${activeBoard[0]._id}`, {
        start_date: start.toISOString(),
        end_date: end.toISOString(),
      });
    } catch (error) {
      console.error("Error updating dates:", error);
    }
  };

  return (
    <div className='flex justify-center font-poppins text-primary dark:text-tertiary space-x-20 text-xl'>
      <div style={{ display: "flex", alignItems: "center" }}>
        Sprint:&ensp; <span className='text-secondary'>{activeTeam.sprint}</span>
        &ensp;&ensp;
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          Comienzo:&ensp;
          <DatePicker
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
            format='dd/MM/yyyy'
            maxDate={endDate} // Limitar la fecha máxima de inicio
          />
          &ensp;Final:&ensp;
          <DatePicker
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
            format='dd/MM/yyyy'
            minDate={startDate} // Limitar la fecha mínima de fin
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};
