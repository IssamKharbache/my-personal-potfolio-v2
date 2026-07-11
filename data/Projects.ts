import { Project } from "@/app/types/project";

export const projects: Project[] = [
  {
    id: "arctic",
    index: "01",
    title: "Arctic Dream tours",
    description:
      "A fully featured tourist agency platform that allows travelers to explore and book Arctic activities with real-time availability. The system includes a multilingual website, booking management, and a custom admin dashboard to manage activities, schedules, and customer reservations.",
    technologies: ["Next.js", "TypeScript", "Postgres", "Figma", "tailwindcss"],
    image: "/arcticProject.png",
    imageAlt: "Arctic dream tours hero",
    href: "https://www.arcticdreamtours.com/",
    githubHref: "https://github.com/IssamKharbache/arctic-dream-tours",
  },
];
