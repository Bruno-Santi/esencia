import { useDashboard } from "../../hooks/useDashboard";
import { UsePagination } from "../../helpers/UsePagination";
import { UsePaginationTopics } from "../../helpers/UsePaginationTopics";

export const TrendingTopics = () => {
  const { topics } = useDashboard();

  if (!topics.length)
    return (
      <div
        className='bg-tertiary shadow-lg rounded-md
      shadow-primary/50 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800 font-poppins text-xl justify-center flex h-4/6 items-center'
      >
        <span className='text-primary/60 dark:text-tertiary'>No topics yet</span>
      </div>
    );
  return (
    <section>
      <li className='list-none'>
        <div className='flex items-center justify-between p-4 rounded-t-md shadow-xs bg-quaternary  dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800   '>
          <div className='flex items-center'>
            <span className='mx-2 font-semibold text-tertiary dark:text-tertiary text-xl'>Trending Topics</span>
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
