import { useState } from 'react';
import { MessageCircle, X, Send, ImageIcon, Calendar, ChevronRight, Flame } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

interface Reaction {
  emoji: string;
  label: string;
  count: number;
}

interface Post {
  id: number;
  type: 'event' | 'news';
  tag: string;
  tagColor: string;
  date: string;
  dateRaw: string; // pour trier
  title: string;
  body: string;
  images: string[];
  reactions: Reaction[];
  comments: Comment[];
  pinned?: boolean;
}

// ─── Données ──────────────────────────────────────────────────────────────────

const EMOJIS = ['🔥', '👏', '💡', '🚀', '❤️'];

const initialPosts: Post[] = [
  {
    id: 1,
    type: 'event',
    tag: 'À venir',
    tagColor: 'bg-primary text-white',
    date: '04 Mars 2026',
    dateRaw: '2026-03-04',
    title: 'Green Up Talk Space 🎙️',
    body:
      "Rendez-vous le 4 mars pour notre premier Green Up Talk Space ! Conférences, tables rondes et échanges autour du numérique responsable et de la transition écologique. Ouvert à tous les étudiants et au grand public.",
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    ],
    reactions: [
      { emoji: '🔥', label: 'Chaud', count: 12 },
      { emoji: '👏', label: 'Bravo', count: 7 },
      { emoji: '💡', label: 'Inspirant', count: 5 },
      { emoji: '🚀', label: 'Go', count: 9 },
      { emoji: '❤️', label: 'J\'aime', count: 14 },
    ],
    comments: [
      { id: 1, author: 'Aminata K.', avatar: 'A', text: "Trop hâte d'y être ! 🙌", time: 'Il y a 2j' },
      { id: 2, author: 'Kevin M.', avatar: 'K', text: 'On sera là en force !', time: 'Il y a 1j' },
    ],
    pinned: true,
  },
  {
    id: 2,
    type: 'event',
    tag: 'En cours',
    tagColor: 'bg-red-500 text-white animate-pulse',
    date: 'Février 2026',
    dateRaw: '2026-02-01',
    title: '🏆 Green Hackathon Dev — EN COURS',
    body:
      "Le BDE Green Spirit organise actuellement un hackathon de développement ! Les équipes sont en pleine action, travaillant sur des solutions innovantes pour la transition numérique. Restez connectés — les projets seront publiés en avril 2026.",
    images: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80',
    ],
    reactions: [
      { emoji: '🔥', label: 'Chaud', count: 34 },
      { emoji: '👏', label: 'Bravo', count: 21 },
      { emoji: '💡', label: 'Inspirant', count: 18 },
      { emoji: '🚀', label: 'Go', count: 27 },
      { emoji: '❤️', label: "J'aime", count: 30 },
    ],
    comments: [
      { id: 1, author: 'Clara O.', avatar: 'C', text: 'Notre équipe est à fond 💪', time: 'Il y a 3h' },
      { id: 2, author: 'Ibrahim S.', avatar: 'I', text: 'On a déjà codé 18h sans dormir 😂', time: 'Il y a 1h' },
      { id: 3, author: 'Fatou D.', avatar: 'F', text: 'La compétition est rude mais le niveau est ouf !', time: 'Il y a 30min' },
    ],
    pinned: false,
  },
  {
    id: 3,
    type: 'event',
    tag: 'Avril 2026',
    tagColor: 'bg-accent text-white',
    date: 'Avril 2026',
    dateRaw: '2026-04-01',
    title: '📦 Publication des projets du Green Hackathon',
    body:
      "En avril, découvrez tous les projets réalisés lors du Green Hackathon Dev ! Les meilleures solutions seront exposées et les équipes gagnantes récompensées. Une célébration de l'innovation étudiante.",
    images: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    ],
    reactions: [
      { emoji: '🔥', label: 'Chaud', count: 8 },
      { emoji: '👏', label: 'Bravo', count: 4 },
      { emoji: '💡', label: 'Inspirant', count: 11 },
      { emoji: '🚀', label: 'Go', count: 6 },
      { emoji: '❤️', label: "J'aime", count: 9 },
    ],
    comments: [],
    pinned: false,
  },
  {
    id: 4,
    type: 'event',
    tag: '18 Mai 2026',
    tagColor: 'bg-secondary text-white',
    date: '18 Mai 2026',
    dateRaw: '2026-05-18',
    title: '💻 Conférence du Numérique',
    body:
      "Green Up Academy organise sa grande Conférence du Numérique le 18 mai 2026. Experts, intervenants du secteur et étudiants se retrouvent pour débattre des enjeux du numérique de demain : IA, cybersécurité, sobriété numérique et impact environnemental.",
    images: [
      'https://images.unsplash.com/photo-1591115765373-5207764f72e4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560439513-74b037a25d84?auto=format&fit=crop&w=800&q=80',
    ],
    reactions: [
      { emoji: '🔥', label: 'Chaud', count: 15 },
      { emoji: '👏', label: 'Bravo', count: 10 },
      { emoji: '💡', label: 'Inspirant', count: 22 },
      { emoji: '🚀', label: 'Go', count: 13 },
      { emoji: '❤️', label: "J'aime", count: 18 },
    ],
    comments: [
      { id: 1, author: 'Nadia O.', avatar: 'N', text: 'Vivement mai ! J\'espère qu\'il y aura des intervenants de renom.', time: 'Il y a 5j' },
    ],
    pinned: false,
  },
];

// ─── Composant grille images ───────────────────────────────────────────────────

function ImageGrid({ images, onOpen }: { images: string[]; onOpen: (i: number) => void }) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="rounded-2xl overflow-hidden cursor-pointer" onClick={() => onOpen(0)}>
        <img src={images[0]} alt="" className="w-full max-h-80 object-cover hover:scale-105 transition-transform duration-300" />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
        {images.map((img, i) => (
          <div key={i} className="cursor-pointer overflow-hidden rounded-xl" onClick={() => onOpen(i)}>
            <img src={img} alt="" className="w-full h-52 object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div className="cursor-pointer overflow-hidden rounded-xl" onClick={() => onOpen(0)}>
          <img src={images[0]} alt="" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="grid grid-rows-2 gap-2">
          {images.slice(1).map((img, i) => (
            <div key={i} className="cursor-pointer overflow-hidden rounded-xl" onClick={() => onOpen(i + 1)}>
              <img src={img} alt="" className="w-full h-[calc(50%-4px)] min-h-[122px] object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4+ images
  const shown = images.slice(0, 4);
  const extra = images.length - 4;
  return (
    <div className="grid grid-cols-2 gap-2">
      {shown.map((img, i) => (
        <div key={i} className="relative cursor-pointer overflow-hidden rounded-xl" onClick={() => onOpen(i)}>
          <img src={img} alt="" className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300" />
          {i === 3 && extra > 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl">
              <span className="text-white text-2xl font-bold">+{extra}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Composant PostCard ────────────────────────────────────────────────────────

function PostCard({
  post,
  onReact,
  onAddComment,
}: {
  post: Post;
  onReact: (postId: number, emoji: string) => void;
  onAddComment: (postId: number, text: string) => void;
}) {
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [showAllComments, setShowAllComments] = useState(false);

  const visibleComments = showAllComments ? post.comments : post.comments.slice(-2);
  const totalReactions = post.reactions.reduce((s, r) => s + r.count, 0);

  const handleSend = () => {
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
  };

  return (
    <article className="bg-white dark:bg-dark-surface rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">

      {/* ── Header ── */}
      <div className="flex items-start justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">GU</span>
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white text-sm">Green Up Academy</p>
            <p className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {post.date}
            </p>
          </div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${post.tagColor}`}>
          {post.tag}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="px-5 pb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{post.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{post.body}</p>
      </div>

      {/* ── Images ── */}
      {post.images.length > 0 && (
        <div className="px-5 pb-3">
          <ImageGrid images={post.images} onOpen={(i) => setLightboxIdx(i)} />
        </div>
      )}

      {/* ── Stats bar ── */}
      <div className="px-5 pb-2 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          {EMOJIS.slice(0, 3).join('')} {totalReactions} réactions
        </span>
        <button onClick={() => setCommentOpen(v => !v)} className="hover:text-primary transition-colors">
          {post.comments.length} commentaire{post.comments.length !== 1 ? 's' : ''}
        </button>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 mx-5" />

      {/* ── Reactions ── */}
      <div className="px-5 py-2 flex items-center gap-1 flex-wrap">
        {post.reactions.map((r) => (
          <button
            key={r.emoji}
            onClick={() => onReact(post.id, r.emoji)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-dark-bg hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all text-sm font-medium group"
            title={r.label}
          >
            <span className="text-base group-hover:scale-125 transition-transform">{r.emoji}</span>
            <span className="text-xs text-gray-500 group-hover:text-primary">{r.count}</span>
          </button>
        ))}
        <button
          onClick={() => setCommentOpen(v => !v)}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-dark-bg hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all text-sm font-medium"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs">Commenter</span>
        </button>
      </div>

      {/* ── Comments section ── */}
      {commentOpen && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-5 pt-4 pb-5 space-y-3 bg-gray-50 dark:bg-dark-bg/50">

          {/* Existing comments */}
          {post.comments.length > 2 && !showAllComments && (
            <button onClick={() => setShowAllComments(true)} className="text-xs text-primary hover:underline">
              Voir les {post.comments.length - 2} commentaires précédents
            </button>
          )}
          {visibleComments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                {c.avatar}
              </div>
              <div className="bg-white dark:bg-dark-surface rounded-2xl px-4 py-2 flex-1">
                <p className="text-xs font-bold text-gray-900 dark:text-white">{c.author}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{c.text}</p>
                <p className="text-xs text-gray-400 mt-1">{c.time}</p>
              </div>
            </div>
          ))}

          {/* New comment input */}
          <div className="flex gap-2 pt-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-emerald-400 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">?</span>
            </div>
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder="Votre prénom..."
                className="w-full bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 text-xs text-gray-800 dark:text-white outline-none focus:border-primary transition-colors"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Écrire un commentaire..."
                  className="flex-1 bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 text-sm text-gray-800 dark:text-white outline-none focus:border-primary transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!commentText.trim()}
                  className="bg-primary text-white rounded-xl px-3 py-1.5 hover:bg-primary/90 disabled:opacity-40 transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button className="absolute top-4 right-4 text-white/60 hover:text-white">
            <X className="h-7 w-7" />
          </button>
          <img
            src={post.images[lightboxIdx]}
            alt=""
            className="max-w-full max-h-[90vh] rounded-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          {post.images.length > 1 && (
            <div className="absolute bottom-6 flex gap-2">
              {post.images.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setLightboxIdx(i); }}
                  className={`w-2 h-2 rounded-full transition-all ${i === lightboxIdx ? 'bg-white scale-125' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

// ─── Page principale ───────────────────────────────────────────────────────────

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filter, setFilter] = useState<'tous' | 'en-cours' | 'a-venir'>('tous');

  const handleReact = (postId: number, emoji: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? {
              ...p,
              reactions: p.reactions.map(r =>
                r.emoji === emoji ? { ...r, count: r.count + 1 } : r
              ),
            }
          : p
      )
    );
  };

  const handleAddComment = (postId: number, text: string) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: Date.now(),
                  author: 'Vous',
                  avatar: 'V',
                  text,
                  time: "À l'instant",
                },
              ],
            }
          : p
      )
    );
  };

  const filtered = posts.filter(p => {
    if (filter === 'en-cours') return p.tag === 'En cours';
    if (filter === 'a-venir') return p.tag !== 'En cours';
    return true;
  });

  // Trier : en cours d'abord, puis par date croissante
  const sorted = [...filtered].sort((a, b) => {
    if (a.tag === 'En cours' && b.tag !== 'En cours') return -1;
    if (b.tag === 'En cours' && a.tag !== 'En cours') return 1;
    return a.dateRaw.localeCompare(b.dateRaw);
  });

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-bg">

      {/* ── Hero ── */}
      <div className="bg-white dark:bg-dark-surface border-b border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-3">
            <Flame className="h-4 w-4" /> Actualités & Événements
          </span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Ce qui se passe à{' '}
            <span className="text-primary">Green Up Academy</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Réagissez, commentez et partagez les événements de votre école.
          </p>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="max-w-2xl mx-auto px-4 pt-8 pb-4">
        <div className="flex gap-2 bg-white dark:bg-dark-surface rounded-2xl p-1.5 border border-gray-100 dark:border-gray-800 shadow-sm">
          {[
            { key: 'tous', label: 'Tous les événements' },
            { key: 'en-cours', label: '🔴 En cours' },
            { key: 'a-venir', label: '📅 À venir' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="max-w-2xl mx-auto px-4 pb-16 space-y-6">

        {sorted.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            Aucun événement dans cette catégorie.
          </div>
        )}

        {sorted.map((post, idx) => (
          <div key={post.id} className="relative">
            {/* Ligne de timeline */}
            {idx < sorted.length - 1 && (
              <div className="absolute left-5 top-full w-0.5 h-6 bg-gray-200 dark:bg-gray-700 z-10" />
            )}
            <PostCard
              post={post}
              onReact={handleReact}
              onAddComment={handleAddComment}
            />
          </div>
        ))}

        {/* Footer card */}
        <div className="bg-gradient-to-br from-primary/10 to-emerald-50 dark:from-primary/5 dark:to-emerald-900/10 rounded-3xl p-6 text-center border border-primary/20">
          <p className="text-primary font-semibold mb-1">D'autres événements arrivent bientôt 👀</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Suivez-nous sur les réseaux pour ne rien manquer.
          </p>
          <div className="flex justify-center gap-2 mt-3">
            <a href="#" className="text-xs text-primary border border-primary/30 rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-all">Instagram</a>
            <a href="#" className="text-xs text-primary border border-primary/30 rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-all">LinkedIn</a>
            <a href="#" className="text-xs text-primary border border-primary/30 rounded-full px-3 py-1 hover:bg-primary hover:text-white transition-all">TikTok</a>
          </div>
        </div>
      </div>
    </div>
  );
}