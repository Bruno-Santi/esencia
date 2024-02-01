import { QUESTIONS } from "../interface";

const shuffleArray = (array: QUESTIONS[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const questions: QUESTIONS[] = [
  {
    id: "question1",
    question: "En una escala del 1 al 10, ¿Qué tan eficiente te sientes al abordar tus tareas diarias?",
    cuadrant_cohef: [0.2, 0.6, 0.1, 0.1],
  },
  {
    id: "question2",
    question: "En una escala del 1 al 10, ¿Cuánto disfrutas del proceso creativo en tu trabajo?",
    cuadrant_cohef: [0.6, 0.1, 0.2, 0.1],
  },
  {
    id: "question3",
    question: "En una escala del 1 al 10, ¿Qué tan bien crees que comunicas tus ideas a tus colegas?",
    cuadrant_cohef: [0.4, 0.3, 0.2, 0.1],
  },
  {
    id: "question4",
    question: "En una escala del 1 al 10, ¿Cuánto valoras las oportunidades de aprendizaje en tu entorno laboral?",
    cuadrant_cohef: [0.2, 0.3, 0.3, 0.2],
  },
  {
    id: "question5",
    question: "En una escala del 1 al 10, ¿Cuánto contribuyes a la colaboración y la sinergia dentro del equipo?",
    cuadrant_cohef: [0.3, 0.5, 0.2, 0],
  },
  {
    id: "question6",
    question: "En una escala del 1 al 10, ¿Cómo evalúas tu capacidad para manejar situaciones de presión?",
    cuadrant_cohef: [0.2, 0.3, 0.4, 0.1],
  },
  {
    id: "question7",
    question: "En una escala del 1 al 10, ¿Qué tan satisfecho/a estás con tu equilibrio entre trabajo y vida personal?",
    cuadrant_cohef: [0.6, 0, 0.1, 0.3],
  },
  {
    id: "question8",
    question: "En una escala del 1 al 10, ¿Cuánto te apasiona la misión y visión de la empresa para la que trabajas?",
    cuadrant_cohef: [0.2, 0.1, 0.6, 0.1],
  },
  {
    id: "question9",
    question: "En una escala del 1 al 10, ¿Qué tan efectivo/a consideras que eres en la resolución de problemas?",
    cuadrant_cohef: [0.2, 0.5, 0.1, 0.2],
  },
  {
    id: "question10",
    question: "En una escala del 1 al 10, ¿Cuánto valoras la diversidad y la inclusión en tu lugar de trabajo?",
    cuadrant_cohef: [0.2, 0.3, 0.1, 0.4],
  },
  {
    id: "question11",
    question: "En una escala del 1 al 10, ¿Cómo calificarías tu capacidad para adaptarte a cambios inesperados?",
    cuadrant_cohef: [0.2, 0.3, 0.4, 0.1],
  },
  {
    id: "question12",
    question: "En una escala del 1 al 10, ¿Cuánto esfuerzo pones en el desarrollo continuo de tus habilidades profesionales?",
    cuadrant_cohef: [0.1, 0.2, 0.6, 0.1],
  },
  {
    id: "question13",
    question: "En una escala del 1 al 10, ¿Qué tan claro/a tienes tus objetivos profesionales a corto plazo?",
    cuadrant_cohef: [0.2, 0.1, 0.6, 0.1],
  },
  {
    id: "question14",
    question: "En una escala del 1 al 10, ¿Cuánto disfrutas de la colaboración interdepartamental?",
    cuadrant_cohef: [0.4, 0.4, 0.1, 0.1],
  },
  {
    id: "question15",
    question: "En una escala del 1 al 10, ¿Qué tan comprometido/a te sientes con el éxito a largo plazo de la empresa?",
    cuadrant_cohef: [0.2, 0.2, 0.5, 0.1],
  },
  {
    id: "question16",
    question: "En una escala del 1 al 10, ¿Cuánto valoras la retroalimentación constructiva en tu crecimiento profesional?",
    cuadrant_cohef: [0.2, 0.3, 0.1, 0.4],
  },
  {
    id: "question17",
    question: "En una escala del 1 al 10, ¿Cómo evalúas tu capacidad para trabajar de manera eficiente bajo presión?",
    cuadrant_cohef: [0.2, 0.2, 0.5, 0.1],
  },
  {
    id: "question18",
    question: "En una escala del 1 al 10, ¿Cuánto participas en actividades de desarrollo de equipo?",
    cuadrant_cohef: [0.1, 0.6, 0.1, 0.2],
  },
  {
    id: "question19",
    question: "En una escala del 1 al 10, ¿Qué tan comprometido/a estás con la mejora continua de tus habilidades?",
    cuadrant_cohef: [0.2, 0.1, 0.5, 0.2],
  },
  {
    id: "question20",
    question: "En una escala del 1 al 10, ¿Cuánto influye el reconocimiento en tu satisfacción laboral?",
    cuadrant_cohef: [0.2, 0.2, 0.4, 0.2],
  },
];

const firstFourQuestions = questions.slice(0, 4);

const randomizedQuestions = shuffleArray(questions.slice(4));

const finalRandomizedQuestions = firstFourQuestions.map((question, index) => ({
  ...question,
  question: randomizedQuestions[index].question,
  cuadrant_cohef: randomizedQuestions[index].cuadrant_cohef,
}));
export { finalRandomizedQuestions };
