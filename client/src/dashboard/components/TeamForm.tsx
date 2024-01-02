import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useImageUpload } from "../../hooks";
import { MdUploadFile } from "react-icons/md";
import { useDashboard } from "../../hooks/useDashboard";

export const TeamForm: React.FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const fileInputRef = useRef(null);

  const { startCreatingTeam } = useDashboard();
  const { imageSelected, handleImageClick, handleFileChange, isLoading } =
    useImageUpload(fileInputRef);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = {
      ...data,
      logo: imageSelected || null,
    };
    startCreatingTeam(formData);
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col mx-auto text-center space-y-12'
    >
      <label htmlFor='teamName' className='text-manrope text-2xl mt-4 '>
        Your team name <span className='text-sm'>(*)</span>{" "}
      </label>
      <input
        className='h-12 w-64 rounded-md p-2 text-sm font-normal  text-center border-2 duration-500 text-primary focus:outline-none focus:border-2 focus:border-secondary/80 focus:font-bold'
        type='text'
        placeholder='Team Name'
        {...register("name", {
          required: true,
          maxLength: 20,
        })}
      />
      <label htmlFor='teamLogo' className='text-manrope text-2xl mt-4 '>
        Your team logo
      </label>
      <input
        type='file'
        accept='.png, .jpg, .jpeg'
        name='teamLogo'
        ref={fileInputRef}
        style={{
          display: "none",
          fontSize: "20px",
        }}
        onChange={handleFileChange}
      />
      {imageSelected ? (
        <div className='w-24 h-24 m-auto mt-4'>
          <img
            src={imageSelected}
            onClick={handleImageClick}
            alt='Team Logo'
            className='object-cover w-full h-full cursor-pointer rounded-full border-2 p-2 border-secondary/80'
          />
        </div>
      ) : (
        <MdUploadFile
          className='w-24 h-24 cursor-pointer m-auto mt-4 text-tertiary duration-700 hover:text-secondary'
          onClick={handleImageClick}
        />
      )}
      <button
        disabled={isLoading}
        className={
          isLoading
            ? "btn-disabled w-4/6 p-2 rounded-lg text-xl mx-auto mt-6 hover:text-primary hover:bg-tertiary duration-700"
            : `btn-primary w-4/6 p-2 rounded-lg text-xl mx-auto mt-6 hover:text-primary hover:bg-tertiary duration-700`
        }
        type='submit'
      >
        {" "}
        {isLoading ? "Uploading Logo" : "Create"}
      </button>
    </form>
  );
};
