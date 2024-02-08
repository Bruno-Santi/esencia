import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import logo from "../../../assets/logo.png";
import { createContext, useContext, useState } from "react";
import * as React from "react";
import { Teams } from "../Teams";
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, Modal, Button, ListItemIcon } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GrGroup } from "react-icons/gr";
import { ModalTeam } from "../ModalTeam";
import { useModal } from "../../../hooks";
import AddIcon from "@mui/icons-material/Add";

export const SideBarContext = createContext({ expanded: false, setExpanded: () => {}, teamsOpen: false, setTeamsOpen: () => {} });

export const SideBar = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const theme = localStorage.getItem("theme");

  React.useEffect(() => {
    console.log(theme);
  }, [theme]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <aside className='h-screen absolute' style={{ zIndex: 99999 }}>
      <nav className={`h-full inline-flex flex-col ${theme === "dark" ? `bg-black` : `bg-white`} border-r shadow-sm`}>
        <div className='p-4 pb-2 flex justify-between items-center'>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className={`${expanded ? "ml-56" : "ml-4"} p-1.5 rounded-lg ${
              theme === "dark" ? `bg-gray-500 text-tertiary hover:text-primary` : `bg-gray-100 hover:bg-gray-200`
            } `}
          >
            {expanded ? <LuChevronFirst size={20} /> : <LuChevronLast size={20} />}{" "}
          </button>
        </div>
        <SideBarContext.Provider value={{ expanded, setExpanded, teamsOpen, setTeamsOpen }}>
          <div className={`flex-1 px-3`} style={{ marginTop: teamsOpen ? "152px" : "0" }}>
            {children}
          </div>
        </SideBarContext.Provider>

        <div
          className={`
            flex justify-between items-center w-52 
            overflow-hidden transition-all ${expanded ? "w-[300px] ml-3" : "w-[0px]"}
        `}
        ></div>
      </nav>
    </aside>
  );
};

export const SideBarItem = ({ icon, text, active, alert }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const theme = localStorage.getItem("theme");
  const { expanded, setExpanded, setTeamsOpen } = useContext(SideBarContext);
  const handleTeamsClick = () => {
    if (text === "Teams") {
      setExpanded(true);
    }
  };

  React.useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <li
      className={`
        relative flex items-center py-4 px-4 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}
    `}
      onClick={handleTeamsClick}
    >
      {/* Si el texto es "Teams" y expanded es true, mostrar el Accordion */}
      {text === "Teams" && expanded && (
        <div className='flex relative w-full'>
          <GrGroup className={`absolute top-3 left-1 my-auto ${theme === "dark" ? "text-secondary" : ""}`} size={24} />
          <Accordion sx={{ border: "0px solid #ccc", marginLeft: "40px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                "& .MuiAccordionSummary-content": {
                  alignItems: "left",
                  marginLeft: "30px",
                },
                "& .MuiSvgIcon-root": {
                  marginRight: "8px",
                },
              }}
            >
              {/* Texto de "Teams" */}
              <Typography>Teams</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Teams />

                <ListItemIcon onClick={openModal}>
                  <span className='font-poppins justify-center text-center m-auto'>
                    <AddIcon /> New Team
                  </span>
                </ListItemIcon>
                <div>{isOpen && <ModalTeam closeModal={closeModal} />}</div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
      {/* Si el texto no es "Teams" o expanded es false, mostrar el icono y el texto */}
      {(text !== "Teams" || !expanded) && (
        <>
          <span className={`${theme === "dark" ? ` text-secondary group-hover:text-primary` : ``}`}>
            {React.cloneElement(icon, { size: expanded ? 24 : 24 })}
          </span>{" "}
          <span
            className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} ${theme === "dark" ? `text-tertiary group-hover:text-primary` : ``}`}
          >
            {text}
          </span>{" "}
          {!expanded && (
            <div
              className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
            >
              {text}
            </div>
          )}
        </>
      )}

      {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}></div>}
    </li>
  );
};
