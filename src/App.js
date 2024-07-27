import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanelMain from "./pages/AdminPanelMain";
import SideMenuComp from "./components/SideMenuComp";
import SayfaEkleMain from "./pages/sayfaEkle/SayfaEkleMain";
import SayfaBilgileriMain from "./pages/sayfaBilgileri/SayfaBilgileriMain";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideMenuComp />
        <Routes>
          <Route path="/" element={<AdminPanelMain />}></Route>
          {!localStorage.getItem("pageToken") && (
            <Route path="/sayfa-panel-ekle" element={<SayfaEkleMain />}></Route>
          )}
          <Route
            path="/sayfa-bilgileri"
            element={<SayfaBilgileriMain />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
