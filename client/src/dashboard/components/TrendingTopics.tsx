import { useDashboard } from "../../hooks/useDashboard";
import { UsePagination } from "../../helpers/UsePagination";
import { UsePaginationTopics } from "../../helpers/UsePaginationTopics";
import { IconButton, Tooltip } from "@mui/material";
import { CiCircleQuestion } from "react-icons/ci";

export const TrendingTopics = () => {
  const { topics } = useDashboard();

  if (!topics.length)
    return (
      <div
        className='bg-tertiary shadow-lg rounded-md
      shadow-primary/50 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 font-poppins text-xl justify-center flex h-4/6 items-center'
      >
        <span className='text-primary/60 dark:text-tertiary'>Sin tópicos aún.</span>
      </div>
    );
  return (
    <section>
      <li className='list-none'>
        <div className='flex items-center justify-between p-4 rounded-t-md shadow-xs bg-quaternary  dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800   '>
          <div className='flex items-center'>
            <span className='flex mx-2 font-semibold text-tertiary dark:text-tertiary text-xl'>
              Tendencias{" "}
              <div className=''>
                <Tooltip
                  title='
Las Tendencias resumen los temas destacados en los comentarios durante las retrospectivas, proporcionando una visión general de los aspectos más discutidos por el equipo. Estos datos ayudan a identificar áreas clave de enfoque para mejorar la colaboración y el desempeño del equipo.'
                  className='ml-2 mb-4 text-2xl'
                >
                  <IconButton sx={{ marginBottom: 0, fontSize: 28 }}>
                    <CiCircleQuestion className='text-tertiary' />
                  </IconButton>
                </Tooltip>
              </div>
            </span>
          </div>
        </div>
        <div className=''>
          <ul
            className='divide-y divide-gray-300 bg-gray-500/20 shadow-lg
         shadow-primary/50  rounded-b-md'
          >
            <div className='animate__animated animate__fadeIn  animate__slower'>
              <UsePaginationTopics topics={topics} />
            </div>
          </ul>
        </div>
      </li>
    </section>
  );
};
