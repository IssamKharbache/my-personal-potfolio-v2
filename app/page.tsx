import Hero from "@/components/hero/Hero";
import Expertise from "@/components/myexpertise/MyExpertise";
import SidebarNavbar from "@/components/navbar/Sidebar";
import ScrollProgress from "@/components/navbar/ScrollProgress";
import { Projects } from "@/components/work/Projects";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <div>
      <SidebarNavbar />
      <ScrollProgress />
      <main className="lg:ml-80">
        <Hero />
        <Expertise />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
