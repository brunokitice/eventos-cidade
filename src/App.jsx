import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/pages/Home.jsx";
import CreateEvent from "./components/pages/CreateEvent.jsx";
import EditEvent from "./components/pages/EditEvent.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import "./components/styles/globals.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/novo" element={<CreateEvent />} />
          <Route path="/editar/:id" element={<EditEvent />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
