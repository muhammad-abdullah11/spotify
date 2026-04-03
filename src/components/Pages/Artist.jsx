import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import popularArtists from '../../assets/popularArtists.json'
import { FaPlay, FaPlus, FaEllipsisH, FaClock } from 'react-icons/fa'

const Artist = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const a = popularArtists.find(x => x.id === Number(id));
    if (!a) return (
        <div className='min-h-screen flex flex-col items-center justify-center'>
            <p className='text-2xl font-bold'>Artist not found</p>
            <button className='bg-green-500 text-white px-4 py-2 rounded-lg mt-4' onClick={() => navigate('/')}>Home</button>
        </div>
    );

    return (
        <div className="font-sans text-black">
            <div className="p-8 flex items-end gap-6 h-[300px] border-b">
                <img src={a.profilePic} className="w-52 h-52 rounded-full shadow-lg object-cover" />
                <div>
                    <h3 className='text-sm font-bold uppercase mb-1'>Verified Artist</h3>
                    <h1 className="text-7xl font-black mb-4">{a.name}</h1>
                    <p className="text-sm font-medium">{Number(a.monthlyListeners).toLocaleString()} monthly listeners</p>
                </div>
            </div>
            <div className="p-8">
                <div className="flex items-center gap-8 mb-8">
                    <FaPlay className="text-5xl text-green-600 cursor-pointer hover:scale-105 transition-all" />
                    <button className="border border-gray-400 px-4 py-1 rounded-full text-sm font-bold hover:border-black">Follow</button>
                    <FaEllipsisH className="text-2xl text-gray-400 hover:text-black cursor-pointer" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Popular</h2>
                <div className="grid grid-cols-[16px_1fr_120px] gap-4 px-4 py-2 border-b text-gray-500 text-xs font-bold uppercase mb-2">
                    <span>#</span><span>Title</span><span className="flex justify-end"><FaClock /></span>
                </div>
                {a.popularSongs.map((song, i) => (
                    <div key={song.id} className="grid grid-cols-[16px_1fr_120px] gap-4 px-4 py-2 items-center rounded-md hover:bg-gray-100 group transition-all">
                        <span className="text-gray-400">{i + 1}</span>
                        <div className="flex items-center gap-4">
                            <img src={song.image} className="w-10 h-10 object-cover" />
                            <div className="font-bold">{song.name}</div>
                        </div>
                        <div className="flex items-center justify-end gap-6 text-gray-500">
                            <span className="text-xs">{Number(song.tottalPlays).toLocaleString()}</span>
                            <span className="w-10 text-right">{song.duration}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Artist;