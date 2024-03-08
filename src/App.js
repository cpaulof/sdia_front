// App.tsx or App.jsx
import {BrowserRouter, useNavigate, Route, Routes, Link} from 'react-router-dom';
import {NextUIProvider} from '@nextui-org/react';
import Home from './pages/home';
import Layout from './pages/layout';

function App() {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index  element={<Home />} />
          <Route path="/help" element={<div><a>Help</a></div>} />
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;