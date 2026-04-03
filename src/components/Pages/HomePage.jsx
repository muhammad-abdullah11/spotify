import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import SongBar from '../SongBar';
import { SongContext } from '../Contexts/SongContext';

const Skeleton = () => (
    <div className='flex flex-wrap gap-4 py-4'>
        {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg w-[200px] animate-pulse">
                <div className='w-full aspect-square bg-gray-200 rounded-md mb-4' />
                <div className='h-4 bg-gray-200 rounded w-3/4 mb-2' />
                <div className='h-3 bg-gray-200 rounded w-1/2' />
            </div>
        ))}
    </div>
);

const HomePage = () => {
    const navigate = useNavigate();
    const { currentSong, setCurrentSong, setIsPlaying } = useContext(SongContext);
    const [data, setData] = useState({ tracks: [], artists: [] });
    const [loading, setLoading] = useState(true);
    const proxy = "https://corsproxy.io/?";

    useEffect(() => {
        axios.get(`${proxy}${encodeURIComponent('https://api.deezer.com/chart/0')}`)
            .then(res => {
                setData({ tracks: res.data.tracks.data, artists: res.data.artists.data });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const playSong = (s) => {
        setCurrentSong({ ...s, image: s.album.cover_medium, duration: `${Math.floor(s.duration/60)}:${(s.duration%60).toString().padStart(2,'0')}` });
        setIsPlaying(true);
    };

    return (
        <main className='px-4 py-2 pb-[100px]'>
            <section className='border-b border-b-gray-500 mb-8'>
                <h1 className='text-3xl font-black mb-6'>Good morning</h1>
                <h2 className='text-xl font-bold mb-4'>Trending now</h2>
                {loading ? <Skeleton /> : (
                    <div className="flex flex-wrap gap-4 py-4">
                        {data.tracks.map((s) => (
                            <div key={s.id} onClick={() => navigate(`/song/${s.id}`)} className="group bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-all w-[200px] cursor-pointer relative">
                                <img className='w-full aspect-square object-cover rounded-md mb-4 shadow-md' src={s.album.cover_medium} alt={s.title} />
                                <p className='font-bold truncate'>{s.title}</p>
                                <p className='text-sm text-gray-500 truncate'>{s.artist.name}</p>
                                <button onClick={(e) => { e.stopPropagation(); playSong(s); }} className='absolute bottom-16 right-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-green-500 text-white p-3 rounded-full shadow-lg transition-all duration-300'>
                                    <FaPlay />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <section className='border-b border-b-gray-500'>
                <h2 className='text-xl font-bold mb-4'>Popular Artists</h2>
                {loading ? <Skeleton /> : (
                    <div className="flex flex-wrap gap-4 py-4">
                        {data.artists.map((a) => (
                            <div onClick={() => navigate(`/artist/${a.id}`)} key={a.id} className="group bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-all w-[200px] cursor-pointer">
                                <img className='w-full aspect-square object-cover rounded-full mb-4 shadow-md' src={a.picture_medium} alt={a.name} />
                                <p className='font-bold truncate'>{a.name}</p>
                                <p className='text-sm text-gray-500'>Artist</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            {currentSong && <SongBar />}
        </main>
    );
};

export default HomePage;