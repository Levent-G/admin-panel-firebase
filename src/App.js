// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./layouts/Layout";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import CreatePage from "./pages/CreatePage";
import ListPage from "./pages/ListPage";
import Users from "./pages/User";
import FieldContent from "./pages/alanIcerigi/AlanIcerigi";
import AlanEkleme from "./pages/alanEkleme/AlanEkleme";
import IcerikList from "./pages/icerikList/IcerikList";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/ana-sayfa" element={<DashBoard />} />
                    <Route path="/kullanicilar" element={<Users />} />
                    <Route path="/sayfa-olustur" element={<CreatePage />} />
                    <Route path="/sayfalarim" element={<ListPage />} />
                    <Route path="/sayfa/:pageName" element={<AlanEkleme />} />
                    <Route path="/sayfa/:pageName/alan/:fieldName" element={<FieldContent />} />
                    <Route path="/sayfa/:pageName/icerikler" element={<IcerikList />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
