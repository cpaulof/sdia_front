// App.tsx or App.jsx
import {BrowserRouter, useNavigate, Route, Routes, Link} from 'react-router-dom';
import {NextUIProvider} from '@nextui-org/react';

import Home from './pages/home';
import Layout from './pages/layout';
import FlightRecord from './pages/flight-record';
import Managment from './pages/managment';
import PID from './pages/pid';
import FaceDetection from './pages/face-detection';
import Missions from './pages/missions';


function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index  element={<PID />} />
          <Route path="managment" element={<Managment />} />
          <Route path="flight-record" element={<FlightRecord />} />
          <Route path="pid" element={<PID />} />
          <Route path="face-detection" element={<FaceDetection />} />
          <Route path="missions" element={<Missions />} />
          <Route path="help" element={<div><a>Help</a></div>} />
          
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;