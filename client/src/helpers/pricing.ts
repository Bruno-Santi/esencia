interface Pricing {
  id: number;
  title: string;
  titleColor: string;
  items: string[];
  price: string;
  background: string;
}

export const pricingItems: Pricing[] = [
  {
    id: 1,
    title: "Gratis",
    titleColor: "text-primary",
    items: ["Un equipo ✅", "Retroespectivas ✅", "Encuestas de pulso diarias ✅", "Tableros ✅", "Reportes ✅"],
    price: "15 días de prueba",
    background: "bg-gray-400/40",
  },
  {
    id: 2,
    title: "Éstandar",
    titleColor: "text-tertiary",
    items: ["Un equipo ✅", "Retroespectivas ✅", "Encuestas de pulso diarias ✅", "Tableros ✅", "Reportes ✅"],
    price: "$9/mes",
    background: "bg-primary",
  },
  {
    id: 3,
    title: "Enterprise",
    titleColor: "text-primary",
    items: ["Cantidad de equipos personalizada ✅", "Ánalisis y reportes avanzados✅", "Soporte prioritario ✅"],
    price: "Contáctanos",
    background: "bg-gray-400/40",
  },
];
