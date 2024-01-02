import JSConfetti from "js-confetti";
import { useEffect } from "react";

export const FinishedSurvey = () => {
  const jsConfetti = new JSConfetti();

  useEffect(() => {
    jsConfetti.addConfetti({
      emojis: ["🎉", "🎉", "🎊"],
      emojiSize: 60,
      confettiNumber: 60,
    });
  }, []);

  return (
    <div className='bg-primary h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <h2 className='font-poppins text-6xl text-tertiary mb-4'>Congratulations!</h2>
        <span className='text-tertiary font-poppins text-2xl'>Thanks for your feedback</span>
      </div>
    </div>
  );
};
