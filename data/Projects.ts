import { Project } from "@/app/types/project";

export const projects: Project[] = [
  {
    id: "arctic",
    index: "01",
    title: "Arctic Dream tours",
    description:
      "A fully featured tourist agency platform that allows travelers to explore and book Arctic activities with real-time availability. The system includes a multilingual website, booking management, and a custom admin dashboard to manage activities, schedules, and customer reservations.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Postgres",
      "Figma",
      "tailwindcss",
      "payment",
    ],
    image: "/arcticProject.png",
    imageAlt: "Arctic dream tours hero",
    href: "https://www.arcticdreamtours.com/",
    githubHref: "https://github.com/IssamKharbache/arctic-dream-tours",
  },
  {
    id: "point",
    index: "02",
    title: "Point batterie service",
    description:
      "An e-commerce platform with a dashboard for easy management of online sales, inventory, and orders. It also includes a local shop system with an integrated cashier, ensuring real-time synchronization between online and in-store sales. Built with Next.js, PostgreSQL, and Prisma for high performance and scalability",
    technologies: ["React", "Next.js", "TypeScript", "Postgres", "tailwindcss"],
    image: "/pointbatterie.png",
    imageAlt: "point batterie image hero",
    href: "",
    githubHref: "https://github.com/IssamKharbache/point-batteries/",
  },

  {
    id: "gym",
    index: "03",
    title: "Fit gym",
    description:
      "Modern responsive website showcasing gym deals, memberships, and promotions. Designed with Next.js for fast performance and a smooth user experience",
    technologies: ["React", "TypeScript", "tailwindcss"],
    image: "/fitgym.png",
    imageAlt: "Fitgym hero",
    href: "https://fitgyme.vercel.app/",
    githubHref: "https://github.com/IssamKharbache/Gym-fit",
  },
];
