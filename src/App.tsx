import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Spectrum from './components/Spectrum';
import Collection from './components/Collection';
import MacroStory from './components/MacroStory';
import Features from './components/Features';
import Colours from './components/Colours';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Spectrum />
        <Collection />
        <MacroStory />
        <Features />
        <Colours />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
