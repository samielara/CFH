import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";
import { cn } from "@/lib/utils";
import RestoreBodyScroll from "@/components/RestoreBodyScroll";


const Layout = () => {
  const location = useLocation();
  const isServices = location.pathname.startsWith("/services");

  return (
    <div className={cn("min-h-screen")}>
      <RestoreBodyScroll />

      <Header />

      <div>
        <Outlet />
      </div>
    </div>
  );
};


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
