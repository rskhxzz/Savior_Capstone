import { Groq } from 'groq-sdk';
import Swal from 'sweetalert2';

const GROQ_API = import.meta.env.VITE_GROQ_API;

const models = [
  "llama-3.2-90b-vision-preview",
  "llama-3.3-70b-specdec",
  "llama3-groq-8b-8192-tool-use-preview",
  "llama3-groq-70b-8192-tool-use-preview"
];

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
  for (let model of models) {
    try {
      const reply = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: 'Harap berikan jawaban dalam bahasa Indonesia.' },
          { role: 'user', content },
        ],
        model: model,
      });
      return reply.choices[0].message.content; 
    } catch (error) {
      console.error(`Model ${model} gagal digunakan:`, error);
    }
  }


  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Model sudah tidak bisa digunakan, hubungi admin untuk memeriksa model yang lebih baru',
  });

  return null; 
};

/**
 * Format teks untuk mendukung HTML seperti bold, list item, dan line breaks.
 * @param {string} text - Input teks.
 * @returns {string} - Teks yang diformat sebagai HTML.
 */
export const formatText = (text) => {
  let formattedText = text;

  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  formattedText = formattedText.replace(/^\d+\.\s+(.*)$/gm, '<li>$1</li>'); 
  formattedText = formattedText.replace(/^-+\s+(.*)$/gm, '<li>$1</li>');   

  if (formattedText.includes('<li>')) {
    formattedText = `<ul>${formattedText}</ul>`;
  }


  formattedText = formattedText.split('\n').map((item, index) => `<span key=${index}>${item}<br /></span>`).join('');

  return formattedText;
};
