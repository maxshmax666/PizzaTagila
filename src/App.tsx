import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import DesignSystemPage from './DesignSystemPage';
import MainPage from './MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ds" element={<DesignSystemPage />} />
        <Route path="/design-system" element={<DesignSystemPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
