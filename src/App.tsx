import { Routes, Route, Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
