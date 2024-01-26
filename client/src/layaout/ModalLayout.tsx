import { LayoutProps } from "../interface";

export const Modal: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='' style={{ zIndex: "600" }}>
      <div className='modal-overlay animate__animated animate__fadeIn' style={{ zIndex: "500" }}>
        <div className='modal-content w-screen md:w-2/6 lg:w-2/6' style={{ zIndex: "400" }}>
          {children}
        </div>
      </div>
    </div>
  );
};
