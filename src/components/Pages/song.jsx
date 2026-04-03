import { useParams, useNavigate } from 'react-router-dom';
import songs from "../../assets/songs.json";
import { FaPlay, FaPlus, FaClock, FaEllipsisH } from "react-icons/fa";
import { useContext } from 'react';
import { SongContext } from '../Contexts/SongContext';

const Song = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { setCurrentSong, setIsPlaying } = useContext(SongContext);
    const s = songs.find(x => x.id === Number(id));

    if (!s) return <div className='min-h-screen flex flex-col items-center justify-center font-sans'>
        <p className='text-2xl font-bold'>Song not found</p>
        <button className='bg-green-500 text-white px-4 py-2 rounded-lg mt-4' onClick={() => navigate('/')}>Back to Home</button>
    </div>;

    const playSong = () => {
        setCurrentSong(s);
        setIsPlaying(true);
    };

    return (
        <div className="font-sans text-black pb-[100px]">
            <div className="p-8 flex items-end gap-6 h-[300px] border-b">
                <img src={s.image} className="w-52 h-52 shadow-lg" />
                <div>
                    <h3 className='text-sm font-bold uppercase mb-1'>{s?.type || "Single"}</h3>
                    <h1 className="text-6xl font-black mb-4">{s.title}</h1>
                    <div className="flex items-center gap-2 text-sm">
                        <img src={s.artist.profilePic} className="w-6 h-6 rounded-full" />
                        <span>{s.artist.name} • {s.releaseDate.split('-')[0]} • {s.duration}</span>
                    </div>
                </div>
            </div>
            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-8">
                        <FaPlay onClick={playSong} className="text-4xl text-green-600 cursor-pointer hover:scale-110 transition-all font-black" />
                        <FaPlus className="text-2xl text-gray-400 hover:text-black cursor-pointer" />
                        <FaEllipsisH className="text-2xl text-gray-400 hover:text-black cursor-pointer" />
                    </div>
                </div>
                <div className="grid grid-cols-[16px_1fr_120px] gap-4 px-4 py-2 border-b text-gray-500 text-xs font-bold uppercase mb-4">
                    <span>#</span><span>Title</span><span className="flex justify-end"><FaClock /></span>
                </div>
                <div onClick={playSong} className="grid grid-cols-[16px_1fr_120px] gap-4 px-4 py-3 items-center rounded-md hover:bg-gray-100 group transition-all cursor-pointer">
                    <span className="text-gray-400 group-hover:text-green-500">1</span>
                    <div>
                        <div className="font-bold group-hover:text-green-500">{s.title}</div>
                        <div className="text-sm text-gray-500">{s.artist.name}</div>
                    </div>
                    <div className="flex items-center justify-end gap-6">
                        <FaPlus className="opacity-0 group-hover:opacity-100 cursor-pointer" />
                        <span className="text-gray-500">{s.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Song;