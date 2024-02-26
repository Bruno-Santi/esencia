import { Accordion, AccordionSummary } from "@mui/material";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { BoardAccordionList } from "./BoardAccordionList";
import { useBoards } from "../hooks/useBoards";

export const BoardAccordion = ({ boards }) => {
  const [expanded, setExpanded] = useState(false);
  const { activeBoard } = useBoards();
  return (
    <Accordion expanded={expanded} onClick={() => setExpanded(!expanded)} className='w-full relative z-50'>
      <AccordionSummary expandIcon={<FaChevronDown className='w-7 p-1 h-7 text-gray-500 rounded-full bg-white ml-3 shadow-sm cursor-pointer' />}>
        {activeBoard.length ? activeBoard[0]?.title : "Tableros"}
      </AccordionSummary>
      <BoardAccordionList boards={boards} />
    </Accordion>
  );
};
