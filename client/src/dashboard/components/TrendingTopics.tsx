import { trending } from "../../mocks/trending";
export const TrendingTopics = () => {
  return (
    <section>
      <li className='list-none'>
        <div className='flex items-center justify-between p-4 rounded-t-md shadow-xs bg-quaternary  dark:bg-gradient-to-br dark:from-zinc-900 dark:to-gray-800   '>
          <div className='flex items-center'>
            <span className='mx-2 font-semibold text-tertiary dark:text-tertiary text-xl'>Trending Topics</span>
          </div>
        </div>
        <div>
          <ul
            className='divide-y divide-gray-300 bg-gray-500/20 shadow-lg
         shadow-primary/50  rounded-b-md'
          >
            {trending.map((item) => (
              <li
                key={item.title}
                className='p-3 duration-500  hover:bg-quaternary dark:hover:bg-gray-300/50 group list-none'
              >
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-semibold text-gray-600 group-hover:text-tertiary dark:text-tertiary '>
                    {item.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </section>
  );
};
