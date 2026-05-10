import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Cases from './pages/Cases';
import ScenarioUpload from './pages/ScenarioUpload';
import MyProgress from './pages/MyProgress';
import AdminPanel from './pages/AdminPanel';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/upload" element={<ScenarioUpload />} />
            <Route path="/progress" element={<MyProgress />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
