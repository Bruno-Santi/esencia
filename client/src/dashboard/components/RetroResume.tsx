export const RetroResume = ({ question, response, vote_up, vote_down }) => {
  return (
    <li className=''>
      {" "}
      • <span className='text-secondary font-bold'>{question}</span> / {response} / {vote_up} 👍 {vote_down} 👎
    </li>
  );
};
