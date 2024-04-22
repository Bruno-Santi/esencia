import { AccordionDetails } from "@mui/material";

import { useDashboard } from "../hooks/useDashboard";

export const ReportsList = ({ reports }) => {
  console.log(reports);
  const { setActiveReport } = useDashboard();
  const reportSorted = reports?.sort((a, b) => a.sprint - b.sprint);
  console.log(reportSorted);

  return (
    <div className='absolute bg-white z-50   min-h-fit'>
      <AccordionDetails
        style={{ backgroundColor: "white", width: "300px" }}
        className='space-y-4 cursor-pointer shadow-lg shadow-primary/40  flex-col relative z-50'
      >
        {reportSorted?.length > 0 ? (
          reportSorted.map(({ id, sprint }) => (
            <div onClick={() => setActiveReport(id)} className='hover:bg-gray-500   hover:text-tertiary p-2' key={id}>
              {`Reporte Sprint ${sprint} `}
            </div>
          ))
        ) : (
          <div className='hover:bg-gray-500 hover:text-tertiary duration-300 p-2'>Sin reportes aún</div>
        )}
      </AccordionDetails>
    </div>
  );
};
