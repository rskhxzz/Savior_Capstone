import { useState } from 'react';

import { requestToGroqAi, formatText } from '../../script/utils/ChatHandler';

const Chat = () => {
  const [content, setContent] = useState(''); // State untuk input
  const [messages, setMessages] = useState([]); // State untuk histori percakapan

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah form submit default

    // Menyimpan pesan pengguna ke dalam histori percakapan
    setMessages([...messages, { role: 'user', content }]);

    const ai = await requestToGroqAi(content); // Menggunakan state content untuk mendapatkan jawaban AI

    // Menyimpan jawaban AI ke dalam histori percakapan
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'ai', content: ai },
    ]);

    setContent(''); // Reset input setelah submit
  };

  return (
    <main className="flex flex-col min-h-screen justify-end items-center bg-white py-1 border-2 px-8">
      <h1 className="text-3xl font-bold text-green-600 mb-1">Hi Savior</h1>
      <p className="text-md text-green-700 mb-1">
        punya pertanyaan terkait lingkungan? tanyakan Hi savior
      </p>

      <div
        className="flex flex-col w-full space-y-4 overflow-y-auto p-4 bg-gray-50"
        style={{
          height: '70vh',
          overflowY: 'scroll',
        }}
      >
        {/* Menampilkan histori percakapan */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-sm p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
              dangerouslySetInnerHTML={{
                __html: formatText(message.content),
              }}
            />
          </div>
        ))}
      </div>

      {/* Box untuk input dan button */}
      <div className="w-full bg-white p-4">
        <form
          className="flex items-center gap-2 w-full bg-white p-4"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Tanyakan pertanyaanmu tentang lingkungan"
            className="border-2 border-green-500 rounded-lg px-4 py-2 text-md focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Kirim
          </button>
        </form>
      </div>
    </main>
  );
};

export default Chat;
