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
        className='bg-tertiary/20 shadow-lg rounded-md
      shadow-primary/50 md:-my-[145px]   lg:-my-[108px] dark:bg-quaternary/40 font-poppins text-xl justify-center flex h-5/6 items-center'
      >
        <span className='text-primary/60 dark:text-tertiary'>Sin tópicos aún.</span>
      </div>
    );
  return (
    <li className='list-none lg:-my-28 md:-my-36 lg:min-h-[400px]  md:min-h-[400px]'>
      <div className='flex items-center justify-between p-2 rounded-t-md shadow-xs bg-quaternary  dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800   '>
        <div className='flex items-center '>
          <span className='flex mx-2 font-semibold relative text-tertiary dark:text-tertiary lg:text-2xl lg:font-bold text-xl'>
            Tendencias{" "}
            <div className=''>
              <Tooltip
                title='
Las Tendencias resumen los temas destacados en los comentarios durante las retrospectivas, proporcionando una visión general de los aspectos más discutidos por el equipo. Estos datos ayudan a identificar áreas clave de enfoque para mejorar la colaboración y el desempeño del equipo.'
                className='ml-2 mb-4 text-2xl'
              >
                <IconButton sx={{ marginBottom: 0, fontSize: 28 }}>
                  <CiCircleQuestion className='text-tertiary relative -top-1' />
                </IconButton>
              </Tooltip>
            </div>
          </span>
        </div>
      </div>
      <div className=''>
        <ul
          className='divide-y divide-gray-300 bg-tertiary/20 shadow-lg
         shadow-primary/50  rounded-b-md'
        >
          <div className='animate__animated animate__fadeIn overflow-y-auto  animate__slower'>
            <UsePaginationTopics topics={topics} />
          </div>
        </ul>
      </div>
    </li>
  );
};
