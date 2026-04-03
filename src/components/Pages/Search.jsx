import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FaSearch, FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { SongContext } from '../Contexts/SongContext';
import SongBar from '../SongBar';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currentSong, setCurrentSong, setIsPlaying } = useContext(SongContext);
    const navigate = useNavigate();
    const proxy = "https://corsproxy.io/?";

    useEffect(() => {
        if (!query.trim()) { setResults([]); return; }
        const delay = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${proxy}${encodeURIComponent(`https://api.deezer.com/search?q=${query}`)}`);
                setResults(res.data.data || []);
            } catch (err) { console.error(err); }
            setLoading(false);
        }, 500);
        return () => clearTimeout(delay);
    }, [query]);

    const playSong = (s) => {
        setCurrentSong({ ...s, image: s.album.cover_medium, duration: `${Math.floor(s.duration/60)}:${(s.duration%60).toString().padStart(2,'0')}` });
        setIsPlaying(true);
    };

    return (
        <main className='px-8 py-4 pb-[100px]'>
            <div className='relative max-w-md mb-8'>
                <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
                <input type="text" placeholder="What do you want to listen to?" value={query} onChange={(e) => setQuery(e.target.value)} className='w-full bg-gray-100 hover:bg-gray-200 border-none outline-none py-3 pl-12 pr-4 rounded-full text-sm font-medium transition-all placeholder:text-gray-500' />
            </div>
            <h2 className='text-2xl font-bold mb-6'>{query ? `Results for "${query}"` : 'Browse all'}</h2>
            {loading ? (
                <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6'>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className='bg-gray-100 p-4 rounded-lg animate-pulse h-[280px]' />
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6'>
                    {results.map((s) => (
                        <div key={s.id} onClick={() => navigate(`/song/${s.id}`)} className='group bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-all cursor-pointer relative'>
                            <img src={s.album.cover_medium} className='w-full aspect-square object-cover rounded-md mb-4 shadow-sm' />
                            <p className='font-bold truncate'>{s.title}</p>
                            <p className='text-sm text-gray-500 truncate'>{s.artist.name}</p>
                            <button onClick={(e) => { e.stopPropagation(); playSong(s); }} className='absolute bottom-16 right-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-green-500 text-white p-3 rounded-full shadow-lg transition-all duration-300'>
                                <FaPlay />
                            </button>
                        </div>
                    ))}
                    {!query && !loading && (
                        ['Pop', 'Rock', 'Electronic', 'Jazz', 'Classical'].map((cat) => (
                            <div key={cat} className='h-[200px] rounded-lg p-4 font-bold text-white text-2xl' style={{ backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}` }}>
                                {cat}
                            </div>
                        ))
                    )}
                </div>
            )}
            {currentSong && <SongBar />}
        </main>
    );
};

export default Search;