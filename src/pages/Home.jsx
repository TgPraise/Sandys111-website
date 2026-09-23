import { useState } from "react";
import IntroGate from "../components/IntroGate";
import Hero from "../components/Hero";
import ThreeReasons from "../components/home/ThreeReasons";
import TrustBar from "../components/home/TrustBar";
import WhatsOnPreview from "../components/home/WhatsOnPreview";
import FromTheKitchen from "../components/home/FromTheKitchen";
import RumRoom from "../components/home/RumRoom";
import SplitCTA from "../components/home/SplitCTA";

// Only play the full gateway animation once per browser session — repeat
// visits to "/" within the same session go straight to the hero.
// const SESSION_KEY = "sandys111-intro-seen";

export default function Home() {
  // const [showGate] = useState(() => !sessionStorage.getItem(SESSION_KEY));
  // const [ready, setReady] = useState(!showGate);

  // const handleComplete = () => {
  //   sessionStorage.setItem(SESSION_KEY, "1");
  //   setReady(true);
  // };

  const [ready, setReady] = useState(false);

  const handleComplete = () => setReady(true);

  return (
    <>
      {/* {showGate && !ready && <IntroGate onComplete={handleComplete} />} */}
      {!ready && <IntroGate onComplete={handleComplete} />}
      <Hero ready={ready} />
      <ThreeReasons />
      <TrustBar />
      <WhatsOnPreview />
      <FromTheKitchen />
      <RumRoom />
      <SplitCTA />
    </>
  );
}
