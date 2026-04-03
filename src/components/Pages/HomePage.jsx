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
    const [data, setData] = useState({ tracks: [], artists: [], releases: [] });
    const [loading, setLoading] = useState(true);
    const proxy = "https://corsproxy.io/?";

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [chart, releases] = await Promise.all([
                    axios.get(`${proxy}${encodeURIComponent('https://api.deezer.com/chart/0')}`),
                    axios.get(`${proxy}${encodeURIComponent('https://api.deezer.com/editorial/0/releases')}`)
                ]);
                setData({ 
                    tracks: chart.data.tracks.data, 
                    artists: chart.data.artists.data,
                    releases: releases.data.data.slice(0, 6)
                });
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        fetchAll();
    }, []);

    const playSong = (s) => {
        setCurrentSong({ ...s, image: s.album?.cover_medium || s.cover_medium, duration: s.duration ? `${Math.floor(s.duration/60)}:${(s.duration%60).toString().padStart(2,'0')}` : '3:00' });
        setIsPlaying(true);
    };

    return (
        <main className='px-8 py-4 pb-[100px]'>
            <section className='mb-12'>
                <h1 className='text-4xl font-black mb-8'>Good morning</h1>
                <div className='flex justify-between items-end mb-6'>
                    <h2 className='text-2xl font-bold'>Trending now</h2>
                    <span className='text-sm font-bold text-gray-500 hover:underline cursor-pointer'>Show all</span>
                </div>
                {loading ? <Skeleton /> : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
                        {data.tracks.map((s) => (
                            <div key={s.id} onClick={() => navigate(`/song/${s.id}`)} className="group bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-all cursor-pointer relative shadow-sm">
                                <img className='w-full aspect-square object-cover rounded-md mb-4' src={s.album.cover_medium} alt={s.title} />
                                <p className='font-bold truncate text-sm'>{s.title}</p>
                                <p className='text-xs text-gray-500 truncate'>{s.artist.name}</p>
                                <button onClick={(e) => { e.stopPropagation(); playSong(s); }} className='absolute bottom-16 right-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-green-500 text-white p-3 rounded-full shadow-xl transition-all duration-300'>
                                    <FaPlay />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className='mb-12'>
                <div className='flex justify-between items-end mb-6'>
                    <h2 className='text-2xl font-bold'>New Releases</h2>
                    <span className='text-sm font-bold text-gray-500 hover:underline cursor-pointer'>Show all</span>
                </div>
                {loading ? <Skeleton /> : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
                        {data.releases.map((r) => (
                            <div key={r.id} className="group bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-all cursor-pointer relative shadow-sm">
                                <img className='w-full aspect-square object-cover rounded-md mb-4' src={r.cover_medium} alt={r.title} />
                                <p className='font-bold truncate text-sm'>{r.title}</p>
                                <p className='text-xs text-gray-500 truncate'>{r.artist.name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className='mb-12'>
                <h2 className='text-2xl font-bold mb-6'>Popular Artists</h2>
                {loading ? <Skeleton /> : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
                        {data.artists.map((a) => (
                            <div onClick={() => navigate(`/artist/${a.id}`)} key={a.id} className="group bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-all cursor-pointer text-center">
                                <img className='w-full aspect-square object-cover rounded-full mb-4 shadow-md' src={a.picture_medium} alt={a.name} />
                                <p className='font-bold truncate text-sm'>{a.name}</p>
                                <p className='text-xs text-gray-500'>Artist</p>
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