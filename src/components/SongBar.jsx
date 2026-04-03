import { useContext, useEffect, useRef, useState } from 'react';
import { SongContext } from './Contexts/SongContext';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa';

const SongBar = () => {
    const { currentSong, isPlaying, setIsPlaying } = useContext(SongContext);
    const [curr, setCurr] = useState(0);
    const audio = useRef(null);

    useEffect(() => {
        if (!audio.current) return;
        if (isPlaying) {
            audio.current.play().catch(() => setIsPlaying(false));
        } else {
            audio.current.pause();
        }
    }, [isPlaying, currentSong?.id]);

    if (!currentSong) return null;

    const onTime = () => {
        if (audio.current?.duration) {
            setCurr((audio.current.currentTime / audio.current.duration) * 100);
        }
    };

    const format = (s) => `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`;

    return (
        <div className='fixed bottom-0 left-0 right-0 h-[90px] bg-white border-t px-4 flex items-center justify-between'>
            <audio key={currentSong.id} ref={audio} src={currentSong.preview} onTimeUpdate={onTime} onEnded={() => setIsPlaying(false)} autoPlay={isPlaying} />
            <div className='flex items-center gap-4 w-[30%]'>
                <img src={currentSong.image} className="w-14 h-14 rounded shadow-sm" />
                <div className="overflow-hidden">
                    <p className='font-bold text-sm truncate'>{currentSong.title}</p>
                    <p className='text-xs text-gray-500 truncate'>{currentSong.artist?.name || currentSong.artist}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-2 w-[40%]'>
                <div className='flex items-center gap-6'>
                    <FaStepBackward className="text-gray-400 hover:text-black cursor-pointer text-lg" />
                    <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:scale-105 transition-all">
                        {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-1" />}
                    </button>
                    <FaStepForward className="text-gray-400 hover:text-black cursor-pointer text-lg" />
                </div>
                <div className='flex items-center gap-2 w-full'>
                    <span className='text-[10px] text-gray-500'>{audio.current ? format(audio.current.currentTime) : '0:00'}</span>
                    <div className='flex-1 h-1 bg-gray-200 rounded-full relative group cursor-pointer'>
                        <div className='absolute h-full bg-black group-hover:bg-green-500 rounded-full transition-all' style={{ width: `${curr}%` }} />
                    </div>
                    <span className='text-[10px] text-gray-500'>{currentSong.duration}</span>
                </div>
            </div>
            <div className='flex items-center justify-end gap-3 w-[30%]'>
                <FaVolumeUp className="text-gray-400" />
                <div className='w-24 h-1 bg-gray-200 rounded-full'>
                    <div className='h-full w-[70%] bg-black rounded-full' />
                </div>
            </div>
        </div>
    )
}

export default SongBar;