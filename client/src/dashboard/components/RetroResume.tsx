export const RetroResume = ({ question, response, vote }) => {
  return (
    <li className=''>
      {" "}
      • <span className='text-secondary font-bold'>{question}</span> / {response} / {vote} 👍
    </li>
  );
};
