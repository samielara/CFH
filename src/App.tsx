import { Routes, Route, Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import RestoreBodyScroll from "@/components/RestoreBodyScroll";
import QuotePage from "./pages/QuotePage";

const Layout = () => (
  <div className="min-h-screen">
    <RestoreBodyScroll />
    <Header />
    <Outlet />
  </div>
);

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/quote" element={<QuotePage />} />
      <Route path="/demande-de-soumission" element={<QuotePage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
