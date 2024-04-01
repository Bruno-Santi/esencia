import { Accordion, AccordionSummary } from "@mui/material";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { BoardAccordionList } from "./BoardAccordionList";
import { useBoards } from "../hooks/useBoards";

export const BoardAccordion = ({ boards }) => {
  const [expanded, setExpanded] = useState(false);
  const { activeBoard } = useBoards();
  const theme = localStorage.getItem("theme");

  // Clase condicional para aplicar estilos basados en el tema oscuro
  const expandIconClass = theme === "dark" ? "text-white" : "text-gray-500";

  return (
    <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)} className='w-full dark:bg-quaternary dark:text-tertiary relative z-50'>
      <AccordionSummary expandIcon={<FaChevronDown className={`w-7 p-1 h-7 rounded-full ml-3 shadow-sm cursor-pointer ${expandIconClass}`} />}>
        {activeBoard.length ? activeBoard[0]?.title : "Tableros"}
      </AccordionSummary>
      <BoardAccordionList boards={boards} />
    </Accordion>
  );
};
