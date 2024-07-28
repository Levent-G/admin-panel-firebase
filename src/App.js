import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanelMain from "./pages/AdminPanelMain";
import SideMenuComp from "./components/SideMenuComp";
import SayfaEkleMain from "./pages/sayfaEkle/SayfaEkleMain";
import SayfaBilgileriMain from "./pages/sayfaBilgileri/SayfaBilgileriMain";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';  // Toast stil dosyasını import etmeyi unutmayın
import BolumIcerikEkleMain from "./pages/bolumIcerikEkle/BolumIcerikEkleMain";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <SideMenuComp />
        <Routes>
          <Route path="/" element={<AdminPanelMain />} />
          {!localStorage.getItem("pageToken") && (
            <Route path="/sayfa-panel-ekle" element={<SayfaEkleMain />} />
          )}
          <Route
            path="/sayfa-bilgileri"
            element={<SayfaBilgileriMain />}
          />
             <Route
            path="/bolum-icerik-sorgula"
            element={<BolumIcerikEkleMain />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
