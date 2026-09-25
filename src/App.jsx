import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Events from "./pages/Events";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Admin from "./pages/Admin";
import Book from "./pages/Book";
import VenueHire from "./pages/VenueHire";
import Careers from "./pages/Careers";
import About from "./pages/About";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="relative overflow-x-hidden">
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<ComingSoon title="Event Details" />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<ComingSoon title="Gallery" />} />
          <Route path="/venue-hire" element={<VenueHire />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/book" element={<Book />} />
          <Route path="/contact" element={<ComingSoon title="Contact" />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}
