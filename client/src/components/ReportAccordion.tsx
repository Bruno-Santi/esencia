import { Accordion, AccordionSummary } from "@mui/material";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { BoardAccordionList } from "./BoardAccordionList";
import { useBoards } from "../hooks/useBoards";
import { useDashboard } from "../hooks/useDashboard";
import { ReportsList } from "./ReportsList";

export const ReportAccordion = ({ reports }) => {
  const [expanded, setExpanded] = useState(false);
  const { activeReport, activeTeam } = useDashboard();
  console.log(reports);
  let reportsInfo;

  if (reports) {
    reportsInfo = reports?.map((report) => {
      return {
        sprint: report.sprint,
        id: report._id,
      };
    });
  }
  console.log(reportsInfo);
  useEffect(() => {
    console.log(activeReport);
  }, [activeReport]);

  return (
    <Accordion
      expanded={expanded}
      onClick={() => setExpanded(!expanded)}
      className='md:w-1/6 lg:w-1/6 sm:w-2/3 relative z-50 '
      style={{ backgroundColor: "white" }}
    >
      <AccordionSummary expandIcon={<FaChevronDown className='w-7 p-1 h-7 text-gray-500 rounded-full ml-3 shadow-sm cursor-pointer' />}>
        {activeReport.length !== 0 ? `Reporte del sprint ${activeReport[0].sprint}` : "Reportes"}
      </AccordionSummary>
      <div className='w-full'>{reports && <ReportsList reports={reportsInfo} />}</div>
    </Accordion>
  );
};
