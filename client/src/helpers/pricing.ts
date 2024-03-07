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
    title: "Free",
    titleColor: "text-primary",
    items: ["One team ✅", "Retroespectives ✅", "Daily Surveys ✅", "Boards ✅", "Collaboration tools ✅", "Basic reporting ✅"],
    price: "15 days free trial",
    background: "bg-gray-400/40",
  },
  {
    id: 2,
    title: "Standard",
    titleColor: "text-tertiary",
    items: ["One team ✅", "Retroespectives ✅", "Daily Surveys ✅", "Boards ✅", "Collaboration tools ✅", "Basic reporting ✅"],
    price: "$9/month",
    background: "bg-primary",
  },
  {
    id: 3,
    title: "Enterprise",
    titleColor: "text-primary",
    items: ["Customizable team size ✅", "Advanced analytics and reporting ✅", "Priority support ✅"],
    price: "Contact Us",
    background: "bg-gray-400/40",
  },
];
