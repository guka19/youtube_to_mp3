import React, { useState } from 'react';
import Download from "./assets/download.svg";

const App = () => {
  const [link, setLink] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleInputChange = (event) => {
    setLink(event.target.value);
  };

  const handleConvertClick = async () => {
    const videoId = extractVideoId(link);

    if (!videoId) {
      alert('Please enter a valid YouTube video link.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://youtube-mp3-download1.p.rapidapi.com/dl?id=' + encodeURIComponent(videoId), {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '494d77e66dmshe0d812fa8e9a7a7p167803jsnb4950bbef3ee',
          'x-rapidapi-host': 'youtube-mp3-download1.p.rapidapi.com',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.link);
    } catch (error) {
      setResult('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center flex-col space-y-8'>
      <span className='font-mono font-bold text-3xl'>
        <span className='text-red-500'>Youtube</span> to mp3 downloader
      </span>
      <input
        type="text"
        value={link}
        onChange={handleInputChange}
        className='border-2 border-slate-700 rounded-lg w-80 px-8 py-2'
        placeholder='Enter the YouTube video link here'
      />
      <button
        onClick={handleConvertClick}
        className='px-8 py-2 bg-slate-700 border-lg text-white rounded-lg hover:bg-slate-800 transition-all'
      >
        {loading ? 'Converting...' : 'Convert'}
      </button>
      {result && (
        <div className='mt-4 p-4 border border-slate-300 rounded-lg bg-slate-100 text-slate-700 flex justify-center items-center'>
          <a href={result} className='flex justify-center items-center'>Download mp3 file <img className='w-8 ml-2' src={Download} alt="download-button" /></a>
        </div>
      )}
    </div>
  );
};

export default App;
