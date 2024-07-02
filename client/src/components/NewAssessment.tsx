import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../helpers/apiToken";

const steps = ["Bienvenido", "Resultados", "Metodología", "Cultura", "Contexto del equipo", "Contacto"];

const groupedQuestions = {
  Resultados: [
    {
      id: "q1",
      question: "¿El equipo es capaz de medir y priorizar el trabajo en función del valor para el cliente/usuario?",
    },
    {
      id: "q2",
      question: "¿El equipo es capaz de entregar nuevas versiones del producto / servicio a intervalos frecuentes de trabajo?",
    },
    {
      id: "q3",
      question: "¿El equipo mide y monitorea métricas relevantes para su desempeño y mejora?",
    },
  ],
  Metodología: [
    {
      id: "q4",
      question: "¿El equipo utiliza técnicas de estimación y planificación colaborativas para prever y gestionar el trabajo futuro?",
    },
    {
      id: "q5",
      question: "¿El equipo utiliza y mantiene actualizados tableros para gestionar y visualizar el trabajo?",
    },
    {
      id: "q6",
      question: "¿El equipo realiza sesiones periódicas para reflexionar sobre su desempeño y mejorar continuamente? (E.g. Retrospectivas)",
    },
    {
      id: "q7",
      question: "¿El equipo realiza demostraciones periódicas de los entregables para obtener retroalimentación temprana?",
    },
    {
      id: "q8",
      question: "¿El equipo realiza reuniones diarias de sincronización para revisar el progreso y los impedimentos?",
    },
  ],
  Cultura: [
    {
      id: "q9",
      question: "¿El equipo adapta su enfoque y procesos en función de la retroalimentación recibida y el aprendizaje obtenido?",
    },
    {
      id: "q10",
      question: "¿El equipo cuenta con un Product Owner claramente definido y disponible para tomar decisiones?",
    },
    {
      id: "q11",
      question: "¿El equipo tiene un ambiente donde se fomenta la colaboración y el trabajo en equipo?",
    },
    {
      id: "q12",
      question: "¿El equipo tiene una cultura abierta a la experimentación y el aprendizaje?",
    },
  ],
};

const initialValues = {
  objectives: "",
  challenges: "",
  culture: "",
  agileQuestions: groupedQuestions.Resultados.concat(groupedQuestions.Metodología, groupedQuestions.Cultura).map((question) => ({
    ...question,
    score: 0,
  })),
  name: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  objetives: Yup.string().trim().min(8, "El objetivo debe tener al menos 8 caracteres").required("El objetivo es requerido"),
  challenges: Yup.string().trim().min(8, "El objetivo debe tener al menos 8 caracteres").required("El objetivo es requerido"),
  culture: Yup.string().trim().min(8, "El objetivo debe tener al menos 8 caracteres").required("El objetivo es requerido"),
  name: Yup.string().min(3, "El nombre del equipo debe tener al menos 3 caracteres").required("Este campo es requerido"),
  email: Yup.string().email("Formato de correo electrónico inválido").required("Este campo es requerido"),
});

export const NewAssessment = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const data = {
      email: values.email,
      teamName: values.name,
      agileQuestions: values.agileQuestions,

      teamGoalsAndFunctions: values.objectives,
      teamChallenges: values.challenges,
      teamCultureAndValues: values.culture,
    };
    try {
      const resp = await api.post("/api/temp-agile-assessment", { ...data });
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  return (
    <section className='w-2/3 flex animate__animated animate__fadeIn animate__slower  justify-center items-center font-poppins m-auto mt-40'>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <span className='font-poppins text-lg'>{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} validateOnChange={false} validateOnBlur={false}>
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, dirty, isValid }) => (
            <Form>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>¡Todos los pasos completados! Has terminado.</Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={() => setActiveStep(0)}>Reiniciar</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Box sx={{ mt: 2, mb: 1 }}>
                    {activeStep === 0 && (
                      <div className='flex flex-col items-center p-16 animate__animated animate__fadeIn animate__slower'>
                        <Typography variant='h6'>Bienvenido a Esencia, la herramienta de gestión de equipos ágiles.</Typography>
                        <Typography>
                          Para comenzar, hemos generado un formulario para crear un assessment para tu equipo, el cual te enviaremos los resultados por correo.
                        </Typography>
                      </div>
                    )}
                    {activeStep === 1 && (
                      <div className='space-y-8  animate__animated animate__fadeIn animate__slower '>
                        <Typography variant='h6'>Paso 1: Resultados</Typography>
                        {groupedQuestions.Resultados.map((question) => (
                          <div key={question.id}>
                            <Typography>{question.question}</Typography>
                            <FormControl fullWidth>
                              <Select
                                value={values.agileQuestions.find((q) => q.id === question.id)?.score || 0}
                                onChange={(e) => {
                                  const { name, value } = e.target;
                                  const updatedAgileQuestions = values.agileQuestions.map((q) => (q.id === question.id ? { ...q, score: value } : q));
                                  handleChange({
                                    target: {
                                      name: "agileQuestions",
                                      value: updatedAgileQuestions,
                                    },
                                  });
                                }}
                              >
                                <MenuItem value={0}>No</MenuItem>
                                <MenuItem value={3}>Sí</MenuItem>
                                <MenuItem value={1}>A veces</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeStep === 2 && (
                      <div className='space-y-8 animate__animated animate__fadeIn animate__slower'>
                        <Typography variant='h6'>Paso 2: Metodología</Typography>
                        {groupedQuestions.Metodología.map((question) => (
                          <div key={question.id}>
                            <Typography>{question.question}</Typography>
                            <FormControl fullWidth>
                              <Select
                                value={values.agileQuestions.find((q) => q.id === question.id)?.score || 0}
                                onChange={(e) => {
                                  const { name, value } = e.target;
                                  const updatedAgileQuestions = values.agileQuestions.map((q) => (q.id === question.id ? { ...q, score: value } : q));
                                  handleChange({
                                    target: {
                                      name: "agileQuestions",
                                      value: updatedAgileQuestions,
                                    },
                                  });
                                }}
                              >
                                <MenuItem value={0}>No</MenuItem>
                                <MenuItem value={3}>Sí</MenuItem>
                                <MenuItem value={1}>A veces</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeStep === 3 && (
                      <div className='space-y-8 animate__animated animate__fadeIn animate__slower'>
                        <Typography variant='h6'>Paso 3: Cultura</Typography>
                        {groupedQuestions.Cultura.map((question) => (
                          <div key={question.id}>
                            <Typography>{question.question}</Typography>
                            <FormControl fullWidth>
                              <Select
                                value={values.agileQuestions.find((q) => q.id === question.id)?.score || 0}
                                onChange={(e) => {
                                  const { name, value } = e.target;
                                  const updatedAgileQuestions = values.agileQuestions.map((q) => (q.id === question.id ? { ...q, score: value } : q));
                                  handleChange({
                                    target: {
                                      name: "agileQuestions",
                                      value: updatedAgileQuestions,
                                    },
                                  });
                                }}
                              >
                                <MenuItem value={0}>No</MenuItem>
                                <MenuItem value={3}>Sí</MenuItem>
                                <MenuItem value={1}>A veces</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        ))}
                      </div>
                    )}
                    {activeStep === 4 && (
                      <div className='flex flex-col items-center space-y-6 animate__animated animate__fadeIn animate__slower'>
                        <Typography variant='h6'>Paso 4: Contexto del Equipo</Typography>
                        <FormControl fullWidth className='mb-4'>
                          <TextField
                            label='Objetivos y funciones de tu equipo'
                            name='objectives'
                            value={values.objectives}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            multiline
                            rows={4}
                            error={touched.objectives && Boolean(errors.objectives)}
                            helperText={touched.objectives && errors.objectives}
                            className='mb-2'
                          />
                          <Typography variant='body2' className='italic text-primary/30 dark:text-tertiary/60'>
                            (Ej.: "Mi equipo se encarga de desarrollar el front end de una plataforma SaaS en la industria de la logística portuaria...")
                          </Typography>
                        </FormControl>

                        <FormControl fullWidth className='mb-4'>
                          <TextField
                            label='Principales desafíos'
                            name='challenges'
                            value={values.challenges}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='¿Cuáles son los principales desafíos a los que se enfrenta tu equipo?'
                            multiline
                            rows={4}
                            // error={touched.challenges && Boolean(errors.challenges)}
                            helperText={touched.challenges && errors.challenges}
                            className='mb-2'
                          />
                          <Typography variant='body2' className='italic text-primary/30 dark:text-tertiary/60'>
                            (Ej.: "Tenemos desafíos en la gestión de dependencias de terceros...")
                          </Typography>
                        </FormControl>

                        <FormControl fullWidth className='mb-4'>
                          <TextField
                            label='Cultura y valores'
                            name='culture'
                            value={values.culture}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='¿Cómo describirías la cultura y los valores de tu equipo actualmente?'
                            multiline
                            rows={4}
                            // error={touched.culture && Boolean(errors.culture)}
                            helperText={touched.culture && errors.culture}
                            className='mb-2'
                          />
                          <Typography variant='body2' className='italic text-primary/30 dark:text-tertiary/60'>
                            (Ej.: "Es un equipo en general de personas jóvenes con ganas de generar un cambio en la organización...")
                          </Typography>
                        </FormControl>
                      </div>
                    )}
                    {activeStep === 5 && (
                      <div className='flex flex-col items-center p-16 space-y-6 animate__animated animate__fadeIn animate__slower'>
                        <Typography variant='h6'>Paso 5: Confirmación de Datos</Typography>

                        <TextField
                          variant='outlined'
                          label='Email'
                          name='email'
                          placeholder='Correo electrónico'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          // error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          className='mb-2 focus:outline-none w-2/6'
                        />
                        <TextField
                          label='Nombre del equipo'
                          type='text'
                          name='name'
                          placeholder='Nombre del equipo'
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          // error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          className='mb-2 focus:outline-none w-2/6'
                        />
                        <Button variant='contained' color='primary' type='submit' onClick={handleSubmit} disabled={isSubmitting}>
                          Enviar
                        </Button>
                      </div>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                      Atrás
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      // disabled={isSubmitting || (activeStep === 4 && (!dirty || !isValid))}
                      onClick={() => {
                        {
                          activeStep === steps.length - 1 ? handleSubmit(values) : handleNext();
                        }
                      }}
                    >
                      {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </section>
  );
};
