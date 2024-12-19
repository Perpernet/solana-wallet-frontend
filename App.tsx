import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import CreateWallet from './pages/CreateWallet';
import ImportWallet from './pages/ImportWallet';
import WalletDashboard from './pages/WalletDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<CreateWallet />} />
        <Route path="/import" element={<ImportWallet />} />
        <Route path="/wallet" element={<WalletDashboard />} />
      </Routes>
    </Router>
  );
}

export default App; 