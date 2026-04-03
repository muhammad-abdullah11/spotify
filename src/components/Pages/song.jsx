import { useParams } from 'react-router-dom';
import songs from "../../assets/songs.json";
import { FaPlay, FaPlus, FaClock, FaEllipsisH } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Song = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const s = songs.find(x => x.id === Number(id));
    if (!s) return <div className='min-h-screen flex flex-col items-center justify-center font-sans'>
        <p className='text-2xl font-bold'>Song not found</p>
        <button className='bg-green-500 text-white px-4 py-2 rounded-lg mt-4' onClick={() => navigate('/')}>Back to Home</button>
    </div>;

    return (
        <div className="font-sans text-black">
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
                        <FaPlay className="text-4xl text-green-600 cursor-pointer" />
                        <FaPlus className="text-2xl text-gray-400 hover:text-black cursor-pointer" />
                        <FaEllipsisH className="text-2xl text-gray-400 hover:text-black cursor-pointer" />
                    </div>
                </div>
                <div className="grid gap-4 px-4 py-2 border-b text-gray-500 text-xs font-bold uppercase mb-4">
                    <span>#</span><span>Title</span><span className="flex justify-end"><FaClock /></span>
                </div>
                <div className="grid gap-4 px-4 py-3 items-center rounded-md hover:bg-gray-100 group transition-all">
                    <span className="text-gray-400">1</span>
                    <div>
                        <div className="font-bold">{s.title}</div>
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