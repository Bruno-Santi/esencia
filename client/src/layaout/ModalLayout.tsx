import { LayoutProps } from "../interface";

export const Modal: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='z-50'>
      <div className='modal-overlay animate__animated animate__fadeIn '>
        <div className='modal-content w-screen md:w-2/6 lg:w-2/6'>{children}</div>
      </div>
    </div>
  );
};
