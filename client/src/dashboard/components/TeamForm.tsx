import React, { useEffect, useRef, useState } from "react";
import { useImageUpload } from "../../hooks";
import { MdUploadFile } from "react-icons/md";
import agileQuestions from "../../data/agileQuestions";
import { useTeamForm } from "../../hooks/useTeamForm";
import { IoMdClose } from "react-icons/io";
import { Select, SelectItem } from "@tremor/react";
import { toastSuccess } from "../../helpers";
import { useDashboard } from "../../hooks/useDashboard";
type TeamFormProps = {
  closeModal: () => void;
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export const TeamForm: React.FC<TeamFormProps> = ({ closeModal, handleClose }) => {
  const { userTeams } = useDashboard();
  const [step, setStep] = useState(!userTeams.length ? 0 : 1);
  const { createTeam, loading, teamId, teamCreated, teamCreatedData, startCreatingAssessment, reportGenerated, generatingReport } = useTeamForm();
  console.log(teamCreated, teamCreatedData);
  const { data } = teamCreatedData;
  console.log(data);

  const fileInputRef = useRef(null);
  const { imageSelected, handleImageClick, handleFileChange, isLoading } = useImageUpload(fileInputRef);

  const [teamData, setTeamData] = useState({
    teamID: "",
    name: "",
    logo: imageSelected ? imageSelected : "https://res.cloudinary.com/di92lsbym/image/upload/c_thumb,w_200,g_face/v1701895638/team-logo_2_fq5yev.png",
    objectives: "",
    challenges: "",
    culture: "",
    agileAssessment: [],
  });
  const handleSubmit = async () => {
    const formattedAgileQuestions = agileQuestions.map((question) => ({
      question: question.question,
      area: question.area,
      score: parseInt(teamData.agileAssessment[question.id] || 0),
    }));

    const formattedData = {
      teamID: data._id,
      teamGoalsAndFunctions: teamData.objectives,
      teamChallenges: teamData.challenges,
      teamCultureAndValues: teamData.culture,
      agileQuestions: formattedAgileQuestions,
    };
    console.log(formattedAgileQuestions);

    console.log(formattedData);
    await startCreatingAssessment(formattedData);
  };

  console.log(imageSelected);
  const handleFirstLogging = () => {
    return localStorage.setItem("firstLogging", "1");
  };
  const handleCreateTeam = async (name, logo) => {
    try {
      await createTeam(name, logo, handleNext);
    } catch (error) {
      console.error("Error al crear el equipo:", error);
      return false;
    }
  };
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step === 1 && teamCreated) return;

    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamData({
      ...teamData,
      [name]: value,
    });
  };
  const handleCloseModal = () => {
    // Llamar a la función handleClose pasada como prop
    handleClose();
    // Cualquier otra lógica de limpieza de datos o acciones necesarias
  };
  useEffect(() => {
    if (reportGenerated) {
      closeModal();
      toastSuccess("Reporte generado exitosamente.");
    }
  }, [reportGenerated]);

  useEffect(() => {
    if (imageSelected) {
      setTeamData({
        ...teamData,
        logo: imageSelected,
      });
    }
  }, [imageSelected]);
  useEffect(() => {
    if (data) {
      setTeamData({
        ...teamData,
        teamID: data._id,
      });
      console.log(data._id);

      console.log(teamData);
    }
  }, [data]);
  const handleAgileAssessmentChange = (questionId, value) => {
    const updatedAssessment = { ...teamData.agileAssessment };
    updatedAssessment[questionId] = value;
    setTeamData({
      ...teamData,
      agileAssessment: updatedAssessment,
    });
  };

  const groupedQuestions = agileQuestions.reduce((acc, question) => {
    if (!acc[question.area]) {
      acc[question.area] = [];
    }
    acc[question.area].push(question);
    return acc;
  }, {});

  return (
    <div className='min-h-[500px] overflow-y-hidden w-full flex m-auto dark:bg-primary justify-center items-center font-poppins text-center'>
      <div className='flex mx-auto items-center justify-center dark:bg-primary p-8 rounded '>
        {/* {(step === 0 || step === 1) && (
          <div className='absolute top-4 right-4 dark:bg-primary'>
            <button className='text-xl font-semibold text-secondary dark:bg-primary' onClick={handleCloseModal}>
              <IoMdClose className='dark:text-teal-50 text-secondary' />
            </button>
          </div>
        )} */}
        {step === 0 && (
          <div className='flex flex-col items-center animate__animated animate__fadeIn animate__slow dark:bg-primary'>
            <h2 className='text-xl font-normal mb-4 dark:text-tertiary/90'>Bienvenido a Esencia, la herramienta de gestión de equipos ágiles.</h2>
            <h2 className='text-primary/70 w-2/3 dark:text-tertiary/90'>
              Para comenzar, hemos generado un onboarding que te tomará cerca de 3 minutos de completar. Se trata de un onboarding de 3 pasos.{" "}
            </h2>
            <ul className='text-left w-2/3 text-primary/70 font-poppins mt-6 space-y-2 dark:text-tertiary/90'>
              <li>
                <span className='text-secondary font-bold text-3xl items-center my-auto justify-center align-middle'>•</span> En el primer paso, crearemos tu
                equipo.{" "}
              </li>
              <li>
                <span className='text-secondary font-bold text-3xl items-center my-auto justify-center align-middle'>•</span> En el segundo paso, responderás 3
                preguntas sobre el contexto actual de tu equipo.
              </li>
              <li>
                <span className='text-secondary font-bold text-3xl items-center my-auto justify-center align-middle'>•</span> En el tercer paso, realizaremos un
                breve assessment sobre las prácticas de agilidad implementadas en el equipo para generar recomendaciones inciales.
              </li>
            </ul>
            <span onClick={handleNext} className='p-2 bg-secondary text-tertiary rounded-lg mt-6 cursor-pointer hover:bg-primary duration-300 '>
              Comenzar
            </span>
          </div>
        )}
        {step === 1 && (
          <div className='flex flex-col items-center animate__animated animate__fadeIn animate__slow'>
            <h2 className='text-lg font-semibold mb-4 dark:text-tertiary/90'>Paso 1: Crea tu equipo.</h2>
            <label className='mb-2 dark:text-tertiary/90'>
              Nombre<span className='italic text-xs dark:text-tertiary/90'>(*)</span>:
            </label>
            <input type='text' placeholder='Nombre' className='input mb-4 rounded-md ' name='name' value={teamData.name} onChange={handleInputChange} />
            <label className='dark:text-tertiary/90'>Logo:</label>
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
              <MdUploadFile className='w-24 h-24 cursor-pointer m-auto mt-4 text-tertiary duration-700 hover:text-secondary' onClick={handleImageClick} />
            )}
            <div className='flex space-x-4 items-center justify-center mt-7 '>
              <span
                onClick={handlePrev}
                className='p-2 rounded-lg bg-gray-300 text-primary/70 hover:text-tertiary hover:bg-secondary duration-300 cursor-pointer '
              >
                Atrás
              </span>
              <span
                onClick={async () => {
                  const result = await handleCreateTeam(teamData.name, teamData.logo);
                  console.log(result);

                  if (result) {
                    handleNext();
                  } else {
                    console.error("No se pudo crear el equipo, revisa los datos y vuelve a intentarlo.");
                  }
                }}
                disabled={loading || !teamData.name || isLoading}
                className={
                  loading
                    ? "btn-disabled w-4/6 p-2 rounded-lg text-base mx-auto  hover:text-primary hover:bg-tertiary duration-700"
                    : "btn-primary w-4/6 p-2 rounded-lg text-base mx-auto  hover:text-tertiary hover:bg-primary duration-300"
                }
              >
                {isLoading ? "Subiendo logo" : "Crear equipo"}
              </span>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className='flex flex-col items-center animate__animated animate__fadeIn animate__slow'>
            <h2 className='text-lg font-semibold mb-4 dark:text-tertiary/90'>Paso 2: Contexto del Equipo.</h2>
            {/* Campos del segundo paso */}
            <label className='mb-2 dark:text-tertiary/90'>Cuentanos sobre los principales objetivos y funciones de tu equipo:</label>
            <p className='text-sm w-3/3 italic mb-2 text-primary/30 dark:text-tertiary/60'>
              (Ej.: "Mi equipo se encarga de desarrollar el front end de una plataforma SaaS en la industria de la logistica portuaria; o, Mi equipo es un
              equipo de diseño multimedia que trabaja con clientes corporativos para el diseño y producción de videos promocionales"){" "}
            </p>
            <textarea
              name='objectives'
              value={teamData.objectives}
              onChange={handleInputChange}
              placeholder='Objetivos y funciones de tu equipo'
              className='input mb-4 rounded-md w-full'
            />
            <label className='mb-2 dark:text-tertiary/90'>¿Cuáles son los principales desafíos a los que se enfrenta tu equipo en su día a día?:</label>
            <p className='text-sm w-3/3 italic mb-2 text-primary/30 dark:text-tertiary/60'>
              (Ej.: "Tenemos desafíos en la gestión de dependencias de terceros; Hemos enfrentaod desafíos en alcanzar la calidad esperara por nuestros
              clientes; Tenemos desafíos en la comunicación con nuestros stakeholders"){" "}
            </p>
            <textarea
              name='challenges'
              value={teamData.challenges}
              onChange={handleInputChange}
              placeholder='Principales desafíos'
              className='input mb-4 rounded-md w-full'
            />
            <label className='mb-2 dark:text-tertiary/90'>¿Cómo describirías la cultura y los valores de tu equipo actualmente?:</label>
            <p className='text-sm w-3/3 italic mb-2 text-primary/30 dark:text-tertiary/60'>
              (Ej.: "Es un equipo en general de personas jovenes con ganar de generar un cambio en la organización, buscamos probar cosas nuevas; Es un equipo
              en el que la comuincación no fluye de tan buena manera, por lo que se generan roces en el día a día; Es un equipo multucultural, en el que estamos
              ubicados en distintos países, lo que dificulta la coordinación"){" "}
            </p>
            <textarea
              name='culture'
              value={teamData.culture}
              onChange={handleInputChange}
              placeholder='Cultura y valores'
              className='input mb-4 rounded-md w-full'
            />
            <div className='flex space-x-4 items-center justify-center mt-7 '>
              {/* <span
                onClick={handlePrev}
                className={`p-2 rounded-lg bg-gray-300 text-primary/70 hover:text-tertiary hover:bg-secondary duration-300 cursor-pointer  ${
                  teamCreated ? "hidden" : ""
                }`}
              >
                Atrás
              </span> */}
              <button
                onClick={handleNext}
                disabled={!teamData.objectives.trim().length || !teamData.challenges.trim().length || !teamData.culture.trim().length}
                className={`${
                  !teamData.objectives.trim().length || !teamData.challenges.trim().length || !teamData.culture.trim().length
                    ? "bg-gray-200 text-primary dark:text-secondary "
                    : "bg-secondary text-primary/70  "
                } p-2 rounded-lg  text-tertiary  hover:text-tertiary hover:bg-primary duration-300 cursor-pointer`}
              >
                Continuar
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className='flex flex-col items-start  animate__animated animate__fadeIn animate__slow'>
            <h2 className='text-lg text-center items-center m-auto font-semibold mb-4 dark:text-tertiary'>Paso 3: Assessment Agile.</h2>
            {/* Preguntas del assessment ágil */}
            {Object.keys(groupedQuestions).map((area) => (
              <div key={area}>
                <h3 className='text-primary text-left font-semibold mb-2'>{area}</h3>
                {groupedQuestions[area].map((question) => (
                  <div key={question.id} className='mb-4 text-left dark:text-tertiary'>
                    <p>{question.question}</p>
                    <div>
                      <select
                        value={teamData.agileAssessment[question.id] || "0"}
                        onChange={(e) => handleAgileAssessmentChange(question.id, e.target.value)}
                        className='input rounded-md mt-2 dark:text-tertiary dark:bg-black'
                      >
                        <option value='0'>No</option>
                        <option value='2'>Sí</option>
                        <option value='1'>A veces</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <div className='flex flex-row m-auto space-x-4 items-center justify-center mt-7 '>
              <span
                onClick={handlePrev}
                className='p-2 rounded-lg bg-gray-300 text-primary/70 hover:text-tertiary hover:bg-secondary duration-300 cursor-pointer '
              >
                Atrás
              </span>
              <span
                onClick={handleNext}
                className='p-2 rounded-lg bg-secondary text-tertiary text-primary/70 hover:text-tertiary hover:bg-primary duration-300 cursor-pointer '
              >
                Continuar
              </span>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className='flex flex-col items-center animate__animated animate__fadeIn animate__slow'>
            <h2 className='text-lg font-semibold mb-4 dark:text-tertiary'>Paso 4: Confirmación.</h2>
            <p className='dark:text-tertiary'>Por favor, revisa tus datos antes de confirmar.</p>
            <div className='flex space-x-4 items-center justify-center mt-7 '>
              <span
                onClick={handlePrev}
                className='p-2 rounded-lg bg-gray-300 text-primary/70 hover:text-tertiary hover:bg-secondary duration-300 cursor-pointer '
              >
                Atrás
              </span>
              <div className='flex flex-col'>
                <button
                  onClick={handleSubmit}
                  disabled={generatingReport}
                  className={`p-2 rounded-lg bg-green-500 text-white hover:text-tertiary hover:bg-primary duration-300 ${
                    generatingReport ? "cursor-wait" : "cursor-pointer"
                  } `}
                >
                  {generatingReport ? "Generando Reporte" : "Generar Reporte"}
                </button>
                {generatingReport && <p>Esto puede demorar 1 minuto.</p>}
              </div>
            </div>
          </div>
        )}
        <div className={`${step === 0 ? "hidden" : ""} flex font-bold  items-center text-3xl space-x-6 mx-0 text-secondary absolute bottom-0`}>
          <div className={`${step === 1 || step === 2 || step === 3 || step === 4 ? "text-primary dark:text-gray-500" : ""} cursor-pointer`}>•</div>
          <div className={`${step === 2 || step === 3 || step === 4 ? "text-primary dark:text-gray-500" : ""} cursor-pointer`}>•</div>
          <div className={`${step === 3 || step === 4 ? "text-primary dark:text-gray-500" : ""} cursor-pointer`}>•</div>
          <div className={`${step === 4 ? "text-primary dark:text-gray-500" : ""} cursor-pointer`}>•</div>
        </div>
      </div>
    </div>
  );
};
