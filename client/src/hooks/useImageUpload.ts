import axios from "axios";
import { useState } from "react";

export const useImageUpload =
  (
    fileInputRef
  ) => {
    const API_KEY =
      import.meta
        .env
        .VITE_IMGBB_APIKEY;
    const [
      imageSelected,
      setImageSelected,
    ] =
      useState(
        null
      );
    const [
      isLoading,
      setIsLoading,
    ] =
      useState(
        false
      );
    const handleImageClick =
      () => {
        fileInputRef.current.click();
      };

    const handleFileChange =
      async (
        event
      ) => {
        const selectedFile =
          event
            .target
            .files[0];
        setIsLoading(
          true
        );
        if (
          selectedFile
        ) {
          console.log(
            "Tipo de archivo:",
            selectedFile.type
          );
          try {
            const formData =
              new FormData();
            formData.append(
              "image",
              selectedFile
            );

            const {
              data,
            } =
              await axios.post(
                "https://api.imgbb.com/1/upload",
                formData,
                {
                  params:
                    {
                      key: API_KEY,
                    },
                }
              );
            const {
              url,
            } =
              data.data;
            setImageSelected(
              url
            );
            setIsLoading(
              false
            );
          } catch (error) {
            console.error(
              "Error al subir la imagen:",
              error
            );
            setIsLoading(
              false
            );
          }
        }
      };

    return {
      imageSelected,
      handleImageClick,
      handleFileChange,
      fileInputRef,
      isLoading,
    };
  };
