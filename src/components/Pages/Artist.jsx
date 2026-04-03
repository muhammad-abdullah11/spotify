import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaEllipsisH, FaClock } from 'react-icons/fa';
import { SongContext } from '../Contexts/SongContext';

const Skeleton = () => (
    <div className="font-sans text-black pb-[100px] animate-pulse">
        <div className="p-8 flex items-end gap-6 h-[300px] border-b">
            <div className="w-52 h-52 rounded-full bg-gray-200" />
            <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-20 mb-4" />
                <div className="h-20 bg-gray-200 rounded w-1/2 mb-6" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
        </div>
        <div className="p-8 space-y-4">
            <div className="h-12 bg-gray-200 rounded w-1/4 mb-8" />
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-gray-100 rounded" />
            ))}
        </div>
    </div>
);

const Artist = () => {
    const { id } = useParams();
    const { setCurrentSong, setIsPlaying } = useContext(SongContext);
    const [data, setData] = useState({ artist: null, tracks: [] });
    const proxy = "https://corsproxy.io/?";

    useEffect(() => {
        const fetch = async () => {
            const [a, t] = await Promise.all([
                axios.get(`${proxy}${encodeURIComponent(`https://api.deezer.com/artist/${id}`)}`),
                axios.get(`${proxy}${encodeURIComponent(`https://api.deezer.com/artist/${id}/top?limit=10`)}`)
            ]);
            setData({ artist: a.data, tracks: t.data.data });
        };
        fetch().catch(err => console.error(err));
    }, [id]);

    if (!data.artist) return <Skeleton />;

    const formatTime = (sec) => `${Math.floor(sec/60)}:${(sec%60).toString().padStart(2,'0')}`;
    const playSong = (s) => {
        setCurrentSong({ ...s, title: s.title, image: s.album.cover_medium, duration: formatTime(s.duration) });
        setIsPlaying(true);
    };

    return (
        <div className="font-sans text-black pb-[100px]">
            <div className="p-8 flex items-end gap-6 h-[300px] border-b">
                <img src={data.artist.picture_medium} className="w-52 h-52 rounded-full shadow-lg object-cover" />
                <div>
                    <h3 className='text-sm font-bold uppercase mb-1'>Verified Artist</h3>
                    <h1 className="text-7xl font-black mb-4 truncate">{data.artist.name}</h1>
                    <p className="text-sm font-medium">{Number(data.artist.nb_fan).toLocaleString()} monthly fans</p>
                </div>
            </div>
            <div className="p-8">
                <div className="flex items-center gap-8 mb-8">
                    <FaPlay onClick={() => playSong(data.tracks[0])} className="text-5xl text-green-600 cursor-pointer hover:scale-105 transition-all" />
                    <button className="border border-gray-400 px-4 py-1 rounded-full text-sm font-bold hover:border-black">Follow</button>
                    <FaEllipsisH className="text-2xl text-gray-400 hover:text-black cursor-pointer" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Popular</h2>
                <div className="grid grid-cols-[16px_1fr_120px] gap-4 px-4 py-2 border-b text-gray-500 text-xs font-bold uppercase mb-2">
                    <span>#</span><span>Title</span><span className="flex justify-end"><FaClock /></span>
                </div>
                {data.tracks.map((s, i) => (
                    <div key={s.id} onClick={() => playSong(s)} className="grid grid-cols-[16px_1fr_120px] gap-4 px-4 py-2 items-center rounded-md hover:bg-gray-100 group transition-all cursor-pointer">
                        <span className="text-gray-400 group-hover:text-green-500">{i + 1}</span>
                        <div className="flex items-center gap-4">
                            <img src={s.album.cover_small} className="w-10 h-10 object-cover" />
                            <div className="font-bold group-hover:text-green-500">{s.title}</div>
                        </div>
                        <div className="flex items-center justify-end gap-6 text-gray-500">
                            <span className="text-xs">{Number(s.rank || 0).toLocaleString()}</span>
                            <span className="w-10 text-right">{formatTime(s.duration)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Artist;