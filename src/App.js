import { BrowserRouter , Routes, Route } from "react-router-dom";
import AdminPanelMain from "./pages/AdminPanelMain";
import SideMenuComp from "./components/SideMenuComp";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideMenuComp />
        <Routes>
          <Route path="/" element={<AdminPanelMain />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
