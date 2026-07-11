import Hero from "@/components/hero/Hero";
import Expertise from "@/components/myexpertise/MyExpertise";
import SidebarNavbar from "@/components/navbar/Sidebar";
import ScrollProgress from "@/components/navbar/ScrollProgress";
import { Projects } from "@/components/work/Projects";

export default function Home() {
  return (
    <div>
      <SidebarNavbar />
      <ScrollProgress />
      <main className="lg:ml-80">
        <Hero />
        <Expertise />
        <Projects />
      </main>
    </div>
  );
}
