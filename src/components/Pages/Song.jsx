import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaPlus, FaClock, FaEllipsisH } from "react-icons/fa";
import { SongContext } from '../Contexts/SongContext';

const Skeleton = () => (
    <div className="font-sans text-black pb-[100px] animate-pulse">
        <div className="p-8 flex items-end gap-6 h-[300px] border-b">
            <div className="w-52 h-52 bg-gray-200 shadow-lg" />
            <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-20 mb-4" />
                <div className="h-16 bg-gray-200 rounded w-3/4 mb-6" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
        </div>
        <div className="p-8">
            <div className="h-10 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-100 rounded" />
                ))}
            </div>
        </div>
    </div>
);

const Song = () => {
    const { id } = useParams();
    const { setCurrentSong, setIsPlaying } = useContext(SongContext);
    const [s, setS] = useState(null);
    const proxy = "https://corsproxy.io/?";

    useEffect(() => {
        axios.get(`${proxy}${encodeURIComponent(`https://api.deezer.com/track/${id}`)}`)
            .then(res => setS(res.data)).catch(err => console.error(err));
    }, [id]);

    if (!s) return <Skeleton />;

    const formatTime = (sec) => `${Math.floor(sec/60)}:${(sec%60).toString().padStart(2,'0')}`;
    const playSong = () => {
        setCurrentSong({ ...s, image: s.album.cover_medium, duration: formatTime(s.duration) });
        setIsPlaying(true);
    };

    return (
        <div className="font-sans text-black pb-[100px]">
            <div className="p-8 flex items-end gap-6 h-[300px] border-b">
                <img src={s.album.cover_medium} className="w-52 h-52 shadow-lg" />
                <div>
                    <h3 className='text-sm font-bold uppercase mb-1'>Single</h3>
                    <h1 className="text-6xl font-black mb-4 truncate">{s.title}</h1>
                    <div className="flex items-center gap-2 text-sm">
                        <img src={s.artist.picture_small} className="w-6 h-6 rounded-full" />
                        <span>{s.artist.name} • {s.release_date?.split('-')[0]} • {formatTime(s.duration)}</span>
                    </div>
                </div>
            </div>
            <div className="p-8">
                <div className="flex items-center gap-8 mb-8">
                    <FaPlay onClick={playSong} className="text-5xl text-green-600 cursor-pointer hover:scale-110 transition-all" />
                    <FaPlus className="text-2xl text-gray-400 hover:text-black cursor-pointer" />
                    <FaEllipsisH className="text-2xl text-gray-400 hover:text-black cursor-pointer" />
                </div>
                <div className="grid grid-cols-[16px_1fr_120px] gap-4 px-4 py-2 border-b text-gray-500 text-xs font-bold uppercase mb-4">
                    <span>#</span><span>Title</span><span className="flex justify-end"><FaClock /></span>
                </div>
                <div onClick={playSong} className="grid grid-cols-[16px_1fr_120px] gap-4 px-4 py-3 items-center rounded-md hover:bg-gray-100 group transition-all cursor-pointer">
                    <span className="text-gray-400 group-hover:text-green-500">1</span>
                    <div>
                        <div className="font-bold group-hover:text-green-500">{s.title}</div>
                        <div className="text-sm text-gray-500 font-bold">{s.artist.name}</div>
                    </div>
                    <div className="flex items-center justify-end gap-6">
                        <FaPlus className="opacity-0 group-hover:opacity-100 cursor-pointer text-gray-400" />
                        <span className="text-gray-500">{formatTime(s.duration)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Song;