interface Testimonial {
  id: number;
  content: string;
  name: string;
  description: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    content:
      "Gracias a Esencia.app he logrado ser más eficiente en mi rol de Project Manager, ya que me ha permitido concentrar en una plataforma todos los eventos ágiles y procesar su información de manera consistente y efectiva.",
    name: "Alvaro Villena",
    description: "Agile Project Manager @ Toptal.com",
    avatar: "https://res.cloudinary.com/di92lsbym/image/upload/v1709913425/esencia/wjwdyffyofa4wjz2t5ac.png",
  },
  {
    id: 2,
    content:
      "He logrado descubrir nuevos insights del equipo al cual acompaño en su transformación ágil gracias a los análisis recomendados por la plataforma, sin lugar a dudas un apoyo fundamental para todo Scrum Master.",
    name: "Santiago Borgarello",
    description: "Scrum Master @ Ewaffle.cl",
    avatar: "https://res.cloudinary.com/di92lsbym/image/upload/v1709913556/esencia/eca0rpsc5thfph6tu877.png",
  },
  {
    id: 3,
    content:
      "En un ambiente de trabajo cada vez más global y remoto, Esencia.app me ha permitido estar cerca de mis equipos a través de sus encuestas de pulso y retrospectivas.",
    name: "Ricardo Aguirre",
    description: "Agile Coach @ Perficient.com",
    avatar: "https://res.cloudinary.com/di92lsbym/image/upload/v1709913641/esencia/duury9592wkdfrz1sg3r.png",
  },
];
