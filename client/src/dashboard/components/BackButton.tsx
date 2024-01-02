import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className='absolute left-28 top-16 pt-2'>
      <IoArrowBackCircleOutline
        onClick={goBack}
        className='cursor-pointer text-6xl text-secondary duration-700 hover:text-primary'
      />
    </div>
  );
};
