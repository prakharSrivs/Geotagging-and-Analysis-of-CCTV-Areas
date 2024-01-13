import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import './app.css'

function App() {

  const center = { lat:26.867153498953662, long:75.81708187468675 };
  const ZOOM_LEVEL=9;

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
