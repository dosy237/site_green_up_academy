import { useState } from 'react';
import { useContent } from '../../../hooks/useContent';
import { Trash2, Reply, CheckCircle2 } from 'lucide-react';

export function CMSMessages() {
  const { content, markMessageAsRead, addMessageReply, deleteMessage } = useContent();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'contact' | 'application'>('all');

  const filteredMessages = content.messages.filter(msg => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'contact') return msg.type === 'contact';
    if (filter === 'application') return msg.type === 'application';
    return true;
  });

  const selectedMsg = selectedMessage && content.messages.find(m => m.id === selectedMessage);

  const handleReply = () => {
    if (!replyText.trim() || !replyEmail.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    if (selectedMsg) {
      // Marquer comme lu
      if (!selectedMsg.read) markMessageAsRead(selectedMsg.id);

      // Ajouter la réponse
      const reply = {
        id: `reply-${Date.now()}`,
        type: 'admin-reply' as const,
        subject: `Re: ${selectedMsg.subject}`,
        from: 'Administration',
        email: replyEmail,
        message: replyText,
        date: new Date().toISOString(),
        read: true,
        replied: false,
        replies: [],
      };

      addMessageReply(selectedMsg.id, reply);

      // Envoyer l'email (optionnel)
      sendReplyEmail(selectedMsg.email, reply);

      setReplyText('');
      setReplyEmail('');
      setIsReplying(false);
    }
  };

  const sendReplyEmail = async (to: string, reply: Message) => {
    try {
      await fetch('/api/send-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          subject: reply.subject,
          message: reply.message,
          replyEmail,
        }),
      });
    } catch (error) {
      console.error('Erreur envoi email:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Liste des messages */}
      <div className="lg:col-span-1">
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
          {/* Filtres */}
          <div className="p-4 border-b border-gray-700 space-y-2">
            <button
              onClick={() => setFilter('all')}
              className={`w-full px-3 py-2 text-sm rounded-lg transition ${
                filter === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Tous ({content.messages.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`w-full px-3 py-2 text-sm rounded-lg transition ${
                filter === 'unread'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Non lus ({content.messages.filter(m => !m.read).length})
            </button>
            <button
              onClick={() => setFilter('contact')}
              className={`w-full px-3 py-2 text-sm rounded-lg transition ${
                filter === 'contact'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Contact
            </button>
            <button
              onClick={() => setFilter('application')}
              className={`w-full px-3 py-2 text-sm rounded-lg transition ${
                filter === 'application'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Candidatures
            </button>
          </div>

          {/* Messages */}
          <div className="max-h-96 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-6 text-center text-gray-400">Aucun message</div>
            ) : (
              filteredMessages.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => {
                    setSelectedMessage(msg.id);
                    if (!msg.read) markMessageAsRead(msg.id);
                  }}
                  className={`w-full px-4 py-3 border-b border-gray-700 text-left transition hover:bg-gray-700 ${
                    selectedMessage === msg.id ? 'bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${msg.read ? 'bg-gray-600' : 'bg-blue-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{msg.from}</p>
                      <p className="text-xs text-gray-400 truncate">{msg.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(msg.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Contenu du message */}
      <div className="lg:col-span-2">
        {selectedMsg ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">DE</p>
                <p className="font-semibold">{selectedMsg.from}</p>
                <p className="text-sm text-gray-400">{selectedMsg.email}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(selectedMsg.date).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => deleteMessage(selectedMsg.id)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-1">SUJET</p>
              <p className="font-semibold">{selectedMsg.subject}</p>
            </div>

            {/* Message content */}
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-300 whitespace-pre-wrap">{selectedMsg.message}</p>
            </div>

            {/* Application details (si candidature) */}
            {selectedMsg.applicationData && (
              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 space-y-2">
                <p className="font-semibold text-blue-400">Détails de la candidature</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Programme</p>
                    <p>{selectedMsg.applicationData.program}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Statut</p>
                    <p className="capitalize">{selectedMsg.applicationData.status}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Replies */}
            {selectedMsg.replies.length > 0 && (
              <div className="space-y-3 bg-gray-700/30 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-400">RÉPONSES ({selectedMsg.replies.length})</p>
                {selectedMsg.replies.map(reply => (
                  <div key={reply.id} className="bg-gray-800 p-3 rounded border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm">{reply.from}</p>
                        <p className="text-xs text-gray-400">{new Date(reply.date).toLocaleString()}</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <p className="text-sm text-gray-300">{reply.message}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply form */}
            {!isReplying ? (
              <button
                onClick={() => setIsReplying(true)}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Reply className="w-4 h-4" />
                Répondre
              </button>
            ) : (
              <div className="bg-gray-700/50 p-4 rounded-lg space-y-3">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">De (adresse pour envoyer depuis)</label>
                  <input
                    type="email"
                    value={replyEmail}
                    onChange={e => setReplyEmail(e.target.value)}
                    placeholder="contact@green-up-academy.com"
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Réponse</label>
                  <textarea
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Tapez votre réponse..."
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleReply}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm transition"
                  >
                    Envoyer
                  </button>
                  <button
                    onClick={() => {
                      setIsReplying(false);
                      setReplyText('');
                    }}
                    className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm transition"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 flex items-center justify-center">
            <p className="text-gray-400">Sélectionnez un message pour le voir</p>
          </div>
        )}
      </div>
    </div>
  );
}
