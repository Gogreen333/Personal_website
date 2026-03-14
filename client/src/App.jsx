import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { ToastProvider } from "@/components/ui/toast";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main>
                <Home />
              </main>
              <Footer />
              <ScrollToTop />
            </>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
