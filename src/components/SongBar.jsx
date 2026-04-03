import { useContext, useEffect, useRef, useState } from 'react';
import { SongContext } from './Contexts/SongContext';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa';
import axios from 'axios';

const SongBar = () => {
    const { currentSong, isPlaying, setIsPlaying, setCurrentSong } = useContext(SongContext);
    const [curr, setCurr] = useState(0);
    const [stream, setStream] = useState(null);
    const audio = useRef(null);
    const proxy = "https://corsproxy.io/?";

    const toggle = () => {
        if (!audio.current) return;
        if (isPlaying) audio.current.pause();
        else audio.current.play().catch(e => console.error("Play error:", e));
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (!currentSong?.id) return;
        axios.get(`${proxy}${encodeURIComponent(`https://api.deezer.com/track/${currentSong.id}`)}`)
            .then(res => setStream(res.data.preview))
            .catch(err => console.error(err));
    }, [currentSong?.id]);

    useEffect(() => {
        if (audio.current && isPlaying && stream) audio.current.play().catch(() => setIsPlaying(false));
    }, [stream, isPlaying]);

    if (!currentSong) return null;

    const onTime = () => audio.current?.duration && setCurr((audio.current.currentTime / audio.current.duration) * 100);
    const format = (s) => !s ? '0:00' : `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`;

    return (
        <div className='fixed bottom-0 left-0 right-0 h-[90px] bg-white border-t px-4 flex items-center justify-between z-[100] shadow-[0_-1px_10px_rgba(0,0,0,0.1)]'>
            {stream && <audio key={currentSong.id} ref={audio} src={`${proxy}${encodeURIComponent(stream)}`} onTimeUpdate={onTime} onEnded={() => setIsPlaying(false)} autoPlay={isPlaying} />}
            <div className='flex items-center gap-4 w-[30%]'>
                <img src={currentSong.image} className="w-14 h-14 rounded shadow-sm object-cover" />
                <div className="overflow-hidden">
                    <p className='font-bold text-sm truncate'>{currentSong.title}</p>
                    <p className='text-xs text-gray-500 truncate'>{currentSong.artist?.name || currentSong.artist}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-2 w-[40%]'>
                <div className='flex items-center gap-6'>
                    <FaStepBackward className="text-gray-400 hover:text-black cursor-pointer text-xl" />
                    <button onClick={toggle} className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-all shadow-md">
                        {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} className="ml-1" />}
                    </button>
                    <FaStepForward className="text-gray-400 hover:text-black cursor-pointer text-xl" />
                </div>
                <div className='flex items-center gap-2 w-full max-w-md'>
                    <span className='text-[10px] text-gray-500 font-bold'>{audio.current ? format(audio.current.currentTime) : '0:00'}</span>
                    <div className='flex-1 h-1 bg-gray-200 rounded-full relative group cursor-pointer'>
                        <div className='absolute h-full bg-black group-hover:bg-green-500 rounded-full transition-all' style={{ width: `${curr}%` }} />
                    </div>
                    <span className='text-[10px] text-gray-500 font-bold'>{currentSong.duration}</span>
                </div>
            </div>
            <div className='flex items-center justify-end gap-3 w-[30%]'>
                <FaVolumeUp className="text-gray-400 hover:text-black cursor-pointer" />
                <div className='w-24 h-1 bg-gray-200 rounded-full group cursor-pointer overflow-hidden'>
                    <div className='h-full w-[70%] bg-black group-hover:bg-green-500 rounded-full transition-all' />
                </div>
            </div>
        </div>
    );
};

export default SongBar;