import { useState } from "react";

import { useModal } from "../hooks";
import { ModalTeam } from "../dashboard/components/ModalTeam";
import { useDashboard } from "../hooks/useDashboard";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import TeamsIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Teams } from "../dashboard/components/Teams";

import MenuIcon from "@mui/icons-material/Menu";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";

export const SideBar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false); // Estado para el Drawer

  const { isOpen, openModal: openModalMembers, closeModal: closeModalMembers } = useModal();
  const { startToggleModal } = useDashboard();

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Esta función evita que el evento se propague al Drawer cuando se hace clic en el Accordion
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      {/* Barra lateral con Drawer en modo temporal (temporary) */}
      <Drawer variant='temporary' anchor='left' open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <Accordion onClick={stopPropagation}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemIcon>
                <TeamsIcon />
              </ListItemIcon>
              <ListItemText primary='Teams' />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <Teams />{" "}
                </ListItem>
                <ListItem button onClick={openModalMembers}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary='Add Team' />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemIcon>
                <OfflineBoltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Avaible Actions' />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <div>board 1</div>
                </ListItem>
                <ListItem button onClick={openModalMembers}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemIcon>
                <ContentPasteIcon />
              </ListItemIcon>
              <ListItemText primary='Board' />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <div>board 1</div>
                </ListItem>
                <ListItem button onClick={openModalMembers}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary='Add Board' />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          {/* Lista de equipos */}
        </List>
      </Drawer>

      {/* Icono para abrir y cerrar el Drawer */}
      <div>
        <IconButton onClick={toggleDrawer} size='large'>
          <MenuIcon className='text-tertiary w-36' fontSize='large' />
        </IconButton>
      </div>

      {/* Modal para agregar equipos */}
      <div>{isOpen && <ModalTeam closeModal={closeModalMembers} />}</div>
    </div>
  );
};
