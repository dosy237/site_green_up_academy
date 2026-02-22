import React, { useState } from 'react';
import { useContent } from '../hooks/useContent';
import { useAuth } from '../contexts/AuthContext';
import {
  Menu,
  X,
  LogOut,
  Settings,
  FileText,
  Image,
  Home,
  BookOpen,
  Users,
  BarChart3,
  Mail,
  Heart,
  Zap,
} from 'lucide-react';

// Sections du dashboard
import { DashboardOverview } from './dashboard/sections/DashboardOverview';
import { CMSHero } from './dashboard/sections/CMSHero';
import { CMSBlog } from './dashboard/sections/CMSBlog';
import { CMSPrograms } from './dashboard/sections/CMSPrograms';
import { CMSGovernance } from './dashboard/sections/CMSGovernance';
import { CMSTestimonials } from './dashboard/sections/CMSTestimonials';
import { CMSStudentLife } from './dashboard/sections/CMSStudentLife';
import { CMSMedia, CMSSettings } from './dashboard/sections/Stubs';
import { CMSMessages } from './dashboard/sections/CMSMessages';

type TabType = 
  | 'overview' 
  | 'hero' 
  | 'programs' 
  | 'governance' 
  | 'testimonials'
  | 'studentLife'
  | 'blog' 
  | 'messages' 
  | 'media'
  | 'settings';

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export function CMSDashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user, logout } = useAuth();
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Vérifier les droits admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Accès refusé</h1>
          <p className="text-gray-600">Seuls les administrateurs peuvent accéder au dashboard</p>
        </div>
      </div>
    );
  }

  // Compter les messages non lus
  const unreadMessages = content.messages.filter(m => !m.read).length;

  const navItems: NavItem[] = [
    { id: 'overview', label: 'Accueil Dashboard', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'hero', label: 'Hero & Titre', icon: <Home className="w-5 h-5" /> },
    { id: 'programs', label: 'Formations', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'governance', label: 'Gouvernance', icon: <Users className="w-5 h-5" /> },
    { id: 'testimonials', label: 'Témoignages', icon: <Heart className="w-5 h-5" /> },
    { id: 'studentLife', label: 'Vie Étudiante', icon: <Zap className="w-5 h-5" /> },
    { id: 'blog', label: 'Actualités', icon: <FileText className="w-5 h-5" /> },
    { id: 'messages', label: 'Messagerie', icon: <Mail className="w-5 h-5" />, badge: unreadMessages },
    { id: 'media', label: 'Galerie Media', icon: <Image className="w-5 h-5" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-700 bg-gray-900/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center font-bold">
                GA
              </div>
              <div>
                <h1 className="text-lg font-bold">Green Up Academy</h1>
                <p className="text-xs text-gray-400">Dashboard CMS</p>
              </div>
            </div>
          </div>

          {/* User & Logout */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user?.username}</p>
              <p className="text-xs text-gray-400">Administrateur</p>
            </div>
            <button
              onClick={() => { 
                logout();
                onNavigate('home');
              }}
              className="p-2 hover:bg-gray-700 rounded-lg transition"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`px-6 py-2 border-t ${
            notification.type === 'success'
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {notification.message}
          </div>
        )}
      </header>

      <div className="flex">
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside className="w-64 border-r border-gray-700 bg-gray-950">
            <nav className="p-4 space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === 'overview' && <DashboardOverview />}
            {activeTab === 'hero' && <CMSHero onSave={() => showNotification('Héro enregistrée')} />}
            {activeTab === 'programs' && <CMSPrograms onSave={() => showNotification('Formation enregistrée')} />}
            {activeTab === 'governance' && <CMSGovernance />}
            {activeTab === 'testimonials' && <CMSTestimonials />}
            {activeTab === 'studentLife' && <CMSStudentLife />}
            {activeTab === 'blog' && <CMSBlog onSave={() => showNotification('Article enregistré')} />}
            {activeTab === 'messages' && <CMSMessages />}
            {activeTab === 'media' && <CMSMedia />}
            {activeTab === 'settings' && <CMSSettings onSave={() => showNotification('Paramètres enregistrés')} />}
          </div>
        </main>
      </div>
    </div>
  );
}
