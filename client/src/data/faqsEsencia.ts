interface Faq {
  id: number;
  title: string;
  subtitle?: string;
  text: string;
  url?: string;
}

export const faqsList: Faq[] = [
  {
    id: 1,
    title: "¿Qué es Esencia?",
    text: "Esencia es una plataforma ágil inteligente diseñada para equipos que desean mejorar su desempeño y eficiencia. Utilizando tecnología avanzada y principios de agilidad, Esencia ofrece herramientas para gestionar tareas, realizar retrospectivas, realizar encuestas pulso y mucho más.",
  },
  {
    id: 2,
    title: "¿Qué hace Esencia?",
    text: "Esencia ofrece una variedad de funciones diseñadas para optimizar la gestión de equipos ágiles. Esto incluye el seguimiento de metas y objetivos, la realización de retrospectivas para la mejora continua, la creación de tableros de tareas, la programación de encuestas pulso diarias y el análisis de datos para obtener insights valiosos.",
  },
  {
    id: 3,
    title: "¿Cómo puedo empezar a usar Esencia?",
    text: "Es fácil comenzar con Esencia. Simplemente regístrate en nuestra plataforma, crea tu equipo y empieza a explorar todas las herramientas y funciones disponibles. Nuestro equipo de soporte también está disponible para ayudarte en cualquier momento.",
  },
  {
    id: 4,
    title: "¿Es Esencia adecuado para mi equipo?",
    text: "Esencia es ideal para cualquier equipo que desee mejorar su agilidad y eficiencia. Ya sea que trabajes en desarrollo de software, marketing, diseño o cualquier otro campo, Esencia puede adaptarse a las necesidades de tu equipo.",
  },
  {
    id: 5,
    title: "¿Es seguro usar Esencia?",
    text: "La seguridad de nuestros usuarios es nuestra máxima prioridad. Esencia utiliza medidas de seguridad robustas para proteger la privacidad y los datos de nuestros usuarios. Todos los datos se almacenan de forma segura y se utilizan únicamente con fines de mejora de la plataforma.",
  },
  {
    id: 6,
    title: "¿Qué tipo de soporte ofrecen?",
    text: "Ofrecemos soporte técnico completo para nuestros usuarios. Si tienes alguna pregunta o problema, nuestro equipo de soporte está disponible para ayudarte por correo electrónico o a través de nuestro chat en vivo dentro de la plataforma. Además, ofrecemos recursos de ayuda y tutoriales para garantizar una experiencia fluida para nuestros usuarios.",
  },
];
