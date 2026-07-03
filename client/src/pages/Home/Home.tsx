import Navbar from "../../components/layout/Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import FeatureSection from "./FeatureSection";
import Footer from "../../components/layout/Footer";

const Home = () => {
  return (
    <div className="bg-slate-950">
      <Navbar />

      <HeroSection />

      <AboutSection />

      <FeatureSection />

      <Footer />
    </div>
  );
};

export default Home;