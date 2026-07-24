import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  User,
  Clock,
  Eye,
  MessageSquare,
  Share2,
  Send,
  X,
  CheckCircle2,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { Article, ArticleComment } from '../types';

interface ArticlesNewsProps {
  articles: Article[];
  onAddComment: (articleId: string, text: string, author: string) => void;
}

export const ArticlesNews: React.FC<ArticlesNewsProps> = ({ articles, onAddComment }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);

  const categories = [
    'Semua',
    'Kegiatan Koperasi',
    'Berita Desa',
    'Pengumuman',
    'Pelatihan',
    'UMKM',
    'Ekonomi Desa',
  ];

  const filtered = articles.filter((a) => {
    if (selectedCategory === 'Semua') return true;
    return a.category === selectedCategory;
  });

  const handleShare = () => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !readingArticle) return;
    const authorName = commentAuthor.trim() || 'Warga Cipageran';
    onAddComment(readingArticle.id, commentText, authorName);
    setCommentText('');
    setCommentAuthor('');
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#1B5E20] dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <Newspaper className="w-4 h-4 text-[#D4AF37]" />
            <span>Kanal Berita & Informasi KOPDES</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 dark:text-white">
            Artikel, Berita Desa & Pengumuman
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Kumpulan kabar terbaru seputar kegiatan Koperasi Desa Cipageran, pelatihan UMKM, dan dinamika kemajuan ekonomi desa.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#1B5E20] text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-[#1B5E20] text-[#D4AF37] text-[10px] font-extrabold rounded-lg shadow">
                  {art.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {art.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {art.readTime}
                    </span>
                  </div>

                  <h2
                    onClick={() => setReadingArticle(art)}
                    className="text-base font-bold font-serif text-slate-900 dark:text-white line-clamp-2 cursor-pointer hover:text-[#1B5E20] transition"
                  >
                    {art.title}
                  </h2>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    {art.author}
                  </span>

                  <button
                    onClick={() => setReadingArticle(art)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-[#1B5E20] dark:text-emerald-300 hover:bg-[#1B5E20] hover:text-white text-xs font-bold transition flex items-center gap-1"
                  >
                    <span>Baca</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Article Reader Modal */}
        {readingArticle && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto animate-scaleUp">
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <span className="px-3 py-1 bg-[#1B5E20] text-[#D4AF37] text-xs font-bold rounded-lg">
                  {readingArticle.category}
                </span>

                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
                  {readingArticle.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-4">
                    <span>Oleh: <strong>{readingArticle.author}</strong></span>
                    <span>• {readingArticle.date}</span>
                    <span>• {readingArticle.readTime}</span>
                  </div>

                  <button
                    onClick={handleShare}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-[#1B5E20] transition flex items-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Bagikan Artikel</span>
                  </button>
                </div>

                {shareSuccess && (
                  <div className="p-3 bg-emerald-100 text-[#1B5E20] rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tautan artikel berhasil disalin ke clipboard!</span>
                  </div>
                )}

                <img
                  src={readingArticle.image}
                  alt={readingArticle.title}
                  className="w-full h-72 object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />

                <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                  {readingArticle.content}
                </div>

                {/* Comments Section */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <h3 className="font-bold text-base font-serif text-slate-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#1B5E20]" />
                    Komentar Warga ({readingArticle.comments.length})
                  </h3>

                  <div className="space-y-3">
                    {readingArticle.comments.map((c) => (
                      <div key={c.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                          <span>{c.author}</span>
                          <span className="text-[10px] text-slate-400">{c.date}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">{c.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment Form */}
                  <form onSubmit={handleSubmitComment} className="space-y-2 pt-2">
                    <input
                      type="text"
                      placeholder="Nama Anda (opsional)"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Tulis tanggapan atau saran Anda..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#1B5E20] hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Kirim
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
