// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import { ThemeProvider } from './providers/ThemeProvider.jsx'; // Add .jsx
import AppContent from './components/app-content.jsx';
import ExpenseTracker from './components/ExpenseTracker.jsx';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/tracker" element={<ExpenseTracker />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;