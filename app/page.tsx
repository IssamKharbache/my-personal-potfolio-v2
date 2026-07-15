import { LayoutGroup } from "framer-motion";
import Hero from "@/components/hero/Hero";
import Expertise from "@/components/myexpertise/MyExpertise";
import SidebarNavbar from "@/components/navbar/Sidebar";
import ScrollProgress from "@/components/navbar/ScrollProgress";
import { Projects } from "@/components/work/Projects";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/footer/Footer";
import { About } from "../components/about/About";
import { FloatingWorkWithMe } from "@/components/FloatingWorkwithMe";
import { WorkWithMeProvider } from "@/context/WorkWithMeContext";

export default function Home() {
  return (
    <WorkWithMeProvider>
      <LayoutGroup>
        <div>
          <SidebarNavbar />
          <ScrollProgress />
          <FloatingWorkWithMe />
          <main className="lg:ml-80">
            <Hero />
            <Expertise />
            <Projects />
            <About />
            <Contact />
            <Footer />
          </main>
        </div>
      </LayoutGroup>
    </WorkWithMeProvider>
  );
}
