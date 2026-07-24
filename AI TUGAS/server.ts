import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client if GEMINI_API_KEY is present
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // AI Chatbot endpoint for Pendamping KOPDES
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (!ai) {
        return res.json({
          reply:
            'Halo! Saya Pendamping AI KOPDES Cipageran. Saat ini layanan AI berjalan dalam mode simulasi cerdas offline. Ada yang bisa saya bantu terkait produk UMKM Cipageran, pendaftaran anggota, atau pengajuan simpan pinjam?',
        });
      }

      const systemInstruction = `
Anda adalah "Pendamping AI KOPDES", asisten virtual resmi untuk Koperasi Desa (KOPDES) Cipageran, Kelurahan Cipageran, Kecamatan Cimahi Utara, Kota Cimahi, Jawa Barat, Indonesia.
Tugas Anda adalah melayani warga desa, anggota koperasi, dan pembeli marketplace dengan ramah, komunikatif, profesional, dan informatif.

Informasi Utama KOPDES Cipageran:
- Alamat: Jl. H. Gofur / Jl. Cipageran No. 88, Cimahi Utara, Kota Cimahi 40511.
- Jam Operasional: Senin - Sabtu (08:00 - 16:00 WIB).
- Layanan Utama: Simpan Pinjam, Marketplace UMKM Desa, Pendaftaran Anggota Koperasi, Pendampingan Usaha, Tabungan Warga, Konsultasi Pengaduan.
- Produk Unggulan: Susu Sapi Murni Cipageran, Olahan Singkong (Keripik/Combro Premium), Batik Cimahi Motif Cipageran, Kerajinan Bambu Paku Haji, Kopi Arabika Cipageran, Aneka Kuliner Lokal.
- Potensi Wisata: Wisata Alam Paku Haji & Peternakan Sapi Perah Cipageran.
- Cara Menjadi Anggota: Mendaftar via menu Anggota, membayar Simpanan Pokok Rp 100.000 (sekali) & Simpanan Wajib Rp 25.000/bulan.
- Cara Mengajukan Pinjaman: Mendaftar sebagai Anggota aktif minimal 3 bulan, mengisi formulir pengajuan pinjaman di menu Layanan.

Berikan jawaban yang singkat, ringkas, solutif, ramah dalam Bahasa Indonesia yang santun. Gunakan format poin jika menjelaskan langkah-langkah.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: message,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Mohon maaf, saya belum bisa memproses tanggapan saat ini.';
      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      return res.status(500).json({
        reply:
          'Mohon maaf, terjadi kendala teknis pada layanan AI. Silakan hubungi Customer Service KOPDES Cipageran via WhatsApp di 0812-3456-7890.',
      });
    }
  });

  // API endpoints for statistics, forms, etc.
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', app: 'KOPDES Cipageran Microsite' });
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
