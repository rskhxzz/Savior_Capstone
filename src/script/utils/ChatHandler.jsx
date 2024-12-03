import { Groq } from 'groq-sdk';

const GROQ_API = import.meta.env.VITE_GROQ_API;

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true,
});

/**
 * Mengirim permintaan ke Groq AI dan mendapatkan respon.
 * @param {string} content - Konten input dari pengguna.
 * @returns {Promise<string>} - Respon dari Groq AI.
 */
export const requestToGroqAi = async (content) => {
  const reply = await groq.chat.completions.create({
    messages: [
      { role: 'system', content: 'Harap berikan jawaban dalam bahasa Indonesia.' },
      { role: 'user', content },
    ],
    model: 'gemma-7b-it',
  });
  return reply.choices[0].message.content;
};

/**
 * Format teks untuk mendukung HTML seperti bold dan list item.
 * @param {string} text - Input teks.
 * @returns {string} - Teks yang diformat sebagai HTML.
 */
export const formatText = (text) => {
  let formattedText = text
    .split('\n')
    .map((item, index) => {
      // Menangani teks tebal
      if (item.startsWith('**') && item.endsWith('**')) {
        item = `<strong>${item.slice(2, -2)}</strong>`;
      }

      // Menangani list item
      if (item.startsWith('*')) {
        item = `<li>${item.slice(1)}</li>`;
      }

      // Menambahkan <br> untuk setiap baris
      return `<span key=${index}>${item}<br /></span>`;
    })
    .join('');

  // Membungkus item list dalam <ul> jika ada
  formattedText = formattedText.replace(/<li>.*?<\/li>/g, (match) => `<ol>${match}</ol>`);

  return formattedText;
};
