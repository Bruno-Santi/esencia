import { QUESTIONS } from "../interface";

// Función para randomizar un array usando el algoritmo de Fisher-Yates
const shuffleArray = (array: QUESTIONS[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const questions: QUESTIONS[] = [
  {
    id: "question1",
    question: "En una escala del 1 al 10, ¿Qué tan eficiente te sientes al abordar tus tareas diarias?",
  },
  {
    id: "question2",
    question: "En una escala del 1 al 10, ¿Cuánto disfrutas del proceso creativo en tu trabajo?",
  },
  {
    id: "question3",
    question: "En una escala del 1 al 10, ¿Qué tan bien crees que comunicas tus ideas a tus colegas?",
  },
  {
    id: "question4",
    question: "En una escala del 1 al 10, ¿Cuánto valoras las oportunidades de aprendizaje en tu entorno laboral?",
  },
  {
    id: "question5",
    question: "En una escala del 1 al 10, ¿Cuánto contribuyes a la colaboración y la sinergia dentro del equipo?",
  },
  {
    id: "question6",
    question: "En una escala del 1 al 10, ¿Cómo evalúas tu capacidad para manejar situaciones de presión?",
  },
  {
    id: "question7",
    question: "En una escala del 1 al 10, ¿Qué tan satisfecho/a estás con tu equilibrio entre trabajo y vida personal?",
  },
  {
    id: "question8",
    question: "En una escala del 1 al 10, ¿Cuánto te apasiona la misión y visión de la empresa para la que trabajas?",
  },
  {
    id: "question9",
    question: "En una escala del 1 al 10, ¿Qué tan efectivo/a consideras que eres en la resolución de problemas?",
  },
  {
    id: "question10",
    question: "En una escala del 1 al 10, ¿Cuánto valoras la diversidad y la inclusión en tu lugar de trabajo?",
  },
  {
    id: "question11",
    question: "En una escala del 1 al 10, ¿Cómo calificarías tu capacidad para adaptarte a cambios inesperados?",
  },
  {
    id: "question12",
    question:
      "En una escala del 1 al 10, ¿Cuánto esfuerzo pones en el desarrollo continuo de tus habilidades profesionales?",
  },
  {
    id: "question13",
    question: "En una escala del 1 al 10, ¿Qué tan claro/a tienes tus objetivos profesionales a corto plazo?",
  },
  {
    id: "question14",
    question: "En una escala del 1 al 10, ¿Cuánto disfrutas de la colaboración interdepartamental?",
  },
  {
    id: "question15",
    question: "En una escala del 1 al 10, ¿Qué tan comprometido/a te sientes con el éxito a largo plazo de la empresa?",
  },
  {
    id: "question16",
    question:
      "En una escala del 1 al 10, ¿Cuánto valoras la retroalimentación constructiva en tu crecimiento profesional?",
  },
  {
    id: "question17",
    question: "En una escala del 1 al 10, ¿Cómo evalúas tu capacidad para trabajar de manera eficiente bajo presión?",
  },
  {
    id: "question18",
    question: "En una escala del 1 al 10, ¿Cuánto participas en actividades de desarrollo de equipo?",
  },
  {
    id: "question19",
    question: "En una escala del 1 al 10, ¿Qué tan comprometido/a estás con la mejora continua de tus habilidades?",
  },
  {
    id: "question20",
    question: "En una escala del 1 al 10, ¿Cuánto influye el reconocimiento en tu satisfacción laboral?",
  },
];

const firstFourQuestions = questions.slice(0, 4);

const randomizedQuestions = shuffleArray(questions.slice(4));

const finalRandomizedQuestions = firstFourQuestions.map((question, index) => ({
  ...question,
  question: randomizedQuestions[index].question,
}));

export { finalRandomizedQuestions };
