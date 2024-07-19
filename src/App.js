import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanelMain from './pages/AdminPanelMain';

function App() {
  return (
    <div className="App">
       <Router>
            <Routes>
                <Route path="/" element={<AdminPanelMain />} />
             
            </Routes>
        </Router>
    </div>
  );
}

export default App;
