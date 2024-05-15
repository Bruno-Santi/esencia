import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const FaqItem = ({ title, subtitle, text, url }) => {
  return (
    <Accordion className='dark:bg-black dark:text-tertiary'>
      <AccordionSummary className='dark:text-tertiary' expandIcon={<ExpandMoreIcon className='dark:text-tertiary' />}>
        <Typography>
          <span className='font-poppins'>{title}</span>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div className='font-poppins flex flex-col justify-center text-center m-auto'>
            {subtitle && (
              <>
                {" "}
                <span className='text-secondary'>{subtitle}</span> <br />
              </>
            )}
            {text} <br />
            {url && <iframe className='mt-6 m-auto' width='560' height='315' src={url} title='Registro' allowFullScreen></iframe>}
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
