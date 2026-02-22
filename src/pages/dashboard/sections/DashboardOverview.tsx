import { useContent } from '../../../hooks/useContent';
import { Users, FileText, Mail, BookOpen } from 'lucide-react';

export function DashboardOverview() {
  const { content } = useContent();

  const stats = [
    {
      label: 'Formations',
      value: content.programs.length,
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Articles Blog',
      value: content.blog.length,
      icon: <FileText className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Messages',
      value: content.messages.length,
      icon: <Mail className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
    },
    {
      label: 'Candidatures',
      value: content.applications.length,
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const unreadMessages = content.messages.filter(m => !m.read).length;
  const newApplications = content.applications.filter(a => a.status === 'new').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bienvenue au Dashboard</h1>
        <p className="text-gray-400">Vue d'ensemble de Green Up Academy</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
              {stat.icon}
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unread Messages */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-400" />
            Messages non lus
          </h2>
          {unreadMessages > 0 ? (
            <div className="space-y-2">
              <p className="text-2xl font-bold text-blue-400">{unreadMessages}</p>
              <p className="text-gray-400">messages en attente</p>
            </div>
          ) : (
            <p className="text-gray-400">Tous les messages sont lus</p>
          )}
        </div>

        {/* New Applications */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-green-400" />
            Candidatures en attente
          </h2>
          {newApplications > 0 ? (
            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-400">{newApplications}</p>
              <p className="text-gray-400">candidatures à examiner</p>
            </div>
          ) : (
            <p className="text-gray-400">Aucune candidature en attente</p>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#" className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-center text-sm font-medium transition">
            Ajouter une formation
          </a>
          <a href="#" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-center text-sm font-medium transition">
            Publier un article
          </a>
          <a href="#" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-center text-sm font-medium transition">
            Consulter messages
          </a>
          <a href="#" className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-center text-sm font-medium transition">
            Gérer candidatures
          </a>
        </div>
      </div>
    </div>
  );
}
