import { BrowserRouter , Routes, Route } from "react-router-dom";
import AdminPanelMain from "./pages/AdminPanelMain";
import SideMenuComp from "./components/SideMenuComp";
import SayfaEkleMain from "./pages/sayfaEkle/SayfaEkleMain";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideMenuComp />
        <Routes>
          <Route path="/" element={<AdminPanelMain />}></Route>
          <Route path="/sayfa-panel-ekle" element={<SayfaEkleMain />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
