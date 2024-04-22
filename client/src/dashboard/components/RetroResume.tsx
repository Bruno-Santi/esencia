export const RetroResume = ({ question, response, vote_up, vote_down }) => {
  return (
    <li className=''>
      {" "}
      • <span className='text-secondary font-bold'>{question}</span> / <span className='dark:text-tertiary'>{response} </span>/{" "}
      <span className='text-green-400 font-bold'>{vote_up}</span> 👍 <span className='text-red-500 font-bold'>{vote_down}</span> 👎
    </li>
  );
};
