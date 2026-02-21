import { useEffect, useState } from 'react';
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
import { AdminDashboard } from './pages/AdminDashboard';
import { useDarkMode } from './hooks/useDarkMode';
export function App() {
  const { theme, toggleTheme } = useDarkMode();
  const [currentPage, setCurrentPage] = useState('home');
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'programs':
        return <ProgramsPage />;
      case 'research':
        return <ResearchPage />;
      case 'governance':
        return <GovernancePage />;
      case 'student-life':
        return <StudentLifePage />;
      case 'admissions':
        return <AdmissionsPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'dashboard':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };
  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${theme}`}>

      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onNavigate={setCurrentPage}
        currentPage={currentPage} />

      <div className="flex-grow">{renderPage()}</div>
      <Footer />
    </div>);

}