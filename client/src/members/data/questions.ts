import { QUESTIONS } from "../interface";

const generateRandomQuestions = (): QUESTIONS[] => {
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
    {
      id: "question21",
      question: "En una escala del 1 al 10, ¿Qué tan productivo te sientes en tu última jornada de trabajo?",
      cuadrant_cohef: [0.5, 0.1, 0.3, 0.1],
    },

    {
      id: "question22",
      question: "¿Cuántas interrupciones experimentaste durante tu última jornada laboral? (1: Muchas, 10: Ninguna)",
      cuadrant_cohef: [0.1, 0.3, 0.4, 0.2],
    },

    {
      id: "question23",
      question: "¿Te sientes motivado para trabajar en tu próxima jornada de trabajo?",
      cuadrant_cohef: [0.5, 0, 0.4, 0.1],
    },

    {
      id: "question24",
      question: "¿Lograste completar tus tareas planificadas el día anterior?",
      cuadrant_cohef: [0.4, 0.2, 0.3, 0.1],
    },

    {
      id: "question25",
      question: "¿Cómo calificarías tu nivel de estrés en tu última jornada de trabajo? (0: Mucho, 10: Poco)",
      cuadrant_cohef: [0.1, 0.1, 0.5, 0.3],
    },

    {
      id: "question26",
      question: "¿Qué tan bien te sentiste trabajando en equipo en tu última jornada de trabajo?",
      cuadrant_cohef: [0.3, 0.5, 0.1, 0.1],
    },

    {
      id: "question27",
      question: "¿Hubo algún obstáculo importante que te impidió avanzar en tus tareas? (1: Muchos, 10: Ninguno)",
      cuadrant_cohef: [0.1, 0.1, 0.4, 0.4],
    },

    {
      id: "question28",
      question: "En una escala del 1 al 10, ¿Qué tan claro te sentiste sobre tus prioridades en tu última jornada de trabajo?",
      cuadrant_cohef: [0.4, 0.1, 0.4, 0.1],
    },

    {
      id: "question29",
      question: "¿Te sentiste apoyado por tus colegas en tu última jornada de trabajo?",
      cuadrant_cohef: [0.2, 0.6, 0, 0.2],
    },

    {
      id: "question31",
      question: "¿Te sentiste inspirado o creativo durante tu última jornada laboral?",
      cuadrant_cohef: [0.4, 0.1, 0.3, 0.2],
    },

    {
      id: "question32",
      question: "¿Te enfrentaste a algún problema técnico que afectara tu trabajo en tu última jornada laboral? (1: Muchos, 10: Ninguno)",
      cuadrant_cohef: [0.2, 0.1, 0.6, 0.1],
    },

    {
      id: "question33",
      question: "¿Experimentaste algún logro significativo en tu última jornada de trabajo?",
      cuadrant_cohef: [0.5, 0.1, 0.3, 0.1],
    },

    {
      id: "question34",
      question: "¿Qué tan satisfecho estás con tu nivel de concentración en tu última jornada de trabajo?",
      cuadrant_cohef: [0.3, 0.1, 0.5, 0.1],
    },

    {
      id: "question35",
      question: "¿Recibiste feedback útil o constructivo en tu última jornada de trabajo?",
      cuadrant_cohef: [0.2, 0.6, 0.1, 0.1],
    },

    {
      id: "question36",
      question: "¿Cuánto tiempo dedicaste en tu última jornada de trabajo a actividades de desarrollo profesional?",
      cuadrant_cohef: [0.1, 0.1, 0.5, 0.3],
    },

    {
      id: "question38",
      question: "¿Qué tan bien te sentiste colaborando con otros equipos o departamentos en tu última jornada de trabajo?",
      cuadrant_cohef: [0.2, 0.6, 0.1, 0.1],
    },

    {
      id: "question39",
      question: "¿Cuánto tiempo dedicaste en tu última jornada de trabajo a tareas no relacionadas con el trabajo?",
      cuadrant_cohef: [0.1, 0.4, 0.2, 0.3],
    },

    {
      id: "question40",
      question: "¿Qué tan satisfecho estás con la comunicación dentro del equipo en tu última jornada de trabajo?",
      cuadrant_cohef: [0.1, 0.4, 0.4, 0.1],
    },

    {
      id: "question41",
      question: "¿Te enfrentaste a algún desafío interesante o gratificante en tu última jornada de trabajo?",
      cuadrant_cohef: [0.2, 0.2, 0.5, 0.1],
    },

    {
      id: "question42",
      question: "¿Te sentiste bien equilibrando tu vida laboral y personal en tu última jornada de trabajo?",
      cuadrant_cohef: [0.2, 0.1, 0.3, 0.4],
    },

    {
      id: "question43",
      question: "¿Tuviste la oportunidad de aprender algo nuevo en tu última jornada de trabajo?",
      cuadrant_cohef: [0.3, 0.2, 0.3, 0.2],
    },

    {
      id: "question44",
      question: "¿Te sentiste bien apoyado por tu líder o supervisor en tu última jornada de trabajo?",
      cuadrant_cohef: [0.1, 0.3, 0.4, 0.2],
    },

    {
      id: "question45",
      question: "¿Cuántas veces te sentiste interrumpido durante tus momentos de máxima concentración en tu última jornada de trabajo? (0: Mucho, 10: Poco)",
      cuadrant_cohef: [0.3, 0.4, 0.1, 0.2],
    },

    {
      id: "question46",
      question: "¿Lograste cumplir tus objetivos personales en tu última jornada de trabajo?",
      cuadrant_cohef: [0.3, 0.2, 0.4, 0.1],
    },

    {
      id: "question47",
      question: "¿Qué tan efectiva fue la colaboración con otros equipos en tu última jornada de trabajo?",
      cuadrant_cohef: [0.1, 0.4, 0.4, 0.1],
    },

    {
      id: "question49",
      question: "¿Te sentiste satisfecho con la calidad de tu trabajo en tu última jornada de trabajo?",
      cuadrant_cohef: [0.4, 0.1, 0.4, 0.1],
    },

    {
      id: "question50",
      question: "¿Lograste alcanzar tus metas en tu última jornada de trabajo?",
      cuadrant_cohef: [0.4, 0.1, 0.4, 0.1],
    },
  ];

  const firstFourQuestions = questions.slice(0, 4);

  const randomizedQuestions = shuffleArray(questions.slice(4));

  const finalRandomizedQuestions = firstFourQuestions.map((question, index) => ({
    ...question,
    question: randomizedQuestions[index].question,
    cuadrant_cohef: randomizedQuestions[index].cuadrant_cohef,
  }));
  return finalRandomizedQuestions;
};

export { generateRandomQuestions };
