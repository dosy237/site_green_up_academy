import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ResearchPage } from './pages/ResearchPage';
import { GovernancePage } from './pages/GovernancePage';
import { StudentLifePage } from './pages/StudentLifePage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { CMSDashboard } from './pages/CMSDashboard';
import { LoginPage } from './pages/LoginPage';
import { useDarkMode } from './hooks/useDarkMode';

// Composant interne qui utilise le contexte auth
function AppContent() {
  const { theme, toggleTheme } = useDarkMode();
  const { user, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Rediriger du dashboard si pas admin
  useEffect(() => {
    if (currentPage === 'dashboard' && user?.role !== 'admin') {
      setCurrentPage('home');
    }
  }, [user, currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Page de login si pas authentifié
  if (!user) {
    return <LoginPage onLoginSuccess={() => setCurrentPage('home')} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'programs':
        return <ProgramsPage onNavigate={setCurrentPage} />;
      case 'research':
        return <ResearchPage onNavigate={setCurrentPage} />;
      case 'governance':
        return <GovernancePage onNavigate={setCurrentPage} />;
      case 'student-life':
        return <StudentLifePage />;
      case 'admissions':
        return <AdmissionsPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'dashboard':
        // Protéger l'accès au dashboard
        if (user?.role !== 'admin') {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Accès refusé</h1>
                <p className="text-gray-600 mb-4">Seuls les administrateurs peuvent accéder au tableau de bord</p>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Retour à l'accueil
                </button>
              </div>
            </div>
          );
        }
        return <CMSDashboard onNavigate={setCurrentPage} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme}`}>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      <div className="flex-grow">{renderPage()}</div>
      <Footer />
    </div>
  );
}

// Composant principal qui enveloppe avec AuthProvider
export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}