import { useEffect, useState } from "react";
import { GoSun } from "react-icons/go";
import { PiMoonStars } from "react-icons/pi";

export const ThemeChange = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
      if (localTheme === "dark") document.querySelector("html").classList.toggle("dark", true);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  const handleChangeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Actualiza la clase en el elemento HTML
    document.querySelector("html").classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div>
      {theme === "light" ? (
        <GoSun
          className='text-4xl text-tertiary cursor-pointer animate__animated animate__fadeIn animate__slower'
          onClick={handleChangeTheme}
        />
      ) : (
        <PiMoonStars
          className='text-4xl text-tertiary cursor-pointer animate__animated animate__fadeIn animate__slower'
          onClick={handleChangeTheme}
        />
      )}
    </div>
  );
};
