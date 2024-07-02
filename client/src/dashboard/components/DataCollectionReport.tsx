import React, { useEffect, useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const renderValue = (value) => {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  } else {
    return "Unsupported Type";
  }
};

export const DataCollectionReport = () => {
  const { dataAmount } = useDashboard();
  const [selectedKey, setSelectedKey] = useState(Object.keys(dataAmount)[0]);

  useEffect(() => {
    console.log(dataAmount);
  }, [dataAmount]);

  const handleChange = (event) => {
    setSelectedKey(event.target.value);
  };

  if (dataAmount.length === 0) return null;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h7' color='textPrimary'>
          Datos de los últimos 15 días
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' width='100%'>
          <Select value={selectedKey} onChange={handleChange} sx={{ mb: 2, width: 200 }} variant='outlined' displayEmpty>
            {Object.keys(dataAmount).map((key) => (
              <MenuItem key={key} value={key}>
                {key.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())}
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant='body2' color='textSecondary'>
              {selectedKey?.replace(/_/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())}:
            </Typography>
            <Typography variant='h6' color='textPrimary' fontWeight='bold'>
              {renderValue(dataAmount[selectedKey])}
            </Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
