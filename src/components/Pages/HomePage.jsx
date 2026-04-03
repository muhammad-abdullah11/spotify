import React, { useContext } from 'react';
import songs from "../../assets/songs.json";
import popularArtists from "../../assets/popularArtists.json";
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import SongBar from '../SongBar';
import { SongContext } from '../Contexts/SongContext';

const HomePage = () => {
    const navigate = useNavigate();
    const { currentSong, setCurrentSong, setIsPlaying } = useContext(SongContext);

    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    return (
        <main className='px-4 py-2 pb-[100px]'>
            <section className='border-b border-b-gray-500 mb-8'>
                <h1 className='text-3xl font-black mb-6'>Good morning</h1>
                <h2 className='text-xl font-bold mb-4'>Trending now</h2>
                <div className="flex flex-wrap gap-4 py-4">
                    {songs.map((song) => (
                        <div key={song.id} className="group bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-all w-[200px] cursor-pointer relative">
                            <img className='w-full aspect-square object-cover rounded-md mb-4 shadow-md' src={song.image} alt={song.title} />
                            <p className='font-bold truncate'>{song.title}</p>
                            <p className='text-sm text-gray-500 truncate'>{song.artist.name}</p>
                            <button onClick={(e) => { e.stopPropagation(); playSong(song); }} className='absolute bottom-16 right-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 bg-green-500 text-white p-3 rounded-full shadow-lg transition-all duration-300'>
                                <FaPlay />
                            </button>
                        </div>
                    ))}
                </div>
            </section>
            <section className='border-b border-b-gray-500'>
                <h2 className='text-xl font-bold mb-4'>Popular Artists</h2>
                <div className="flex flex-wrap gap-4 py-4">
                    {popularArtists.map((artist) => (
                        <div onClick={() => navigate(`/artist/${artist.id}`)} key={artist.id} className="group bg-gray-100 hover:bg-gray-200 p-4 rounded-lg transition-all w-[200px] cursor-pointer">
                            <img className='w-full aspect-square object-cover rounded-full mb-4 shadow-md' src={artist.profilePic} alt={artist.name} />
                            <p className='font-bold truncate'>{artist.name}</p>
                            <p className='text-sm text-gray-500'>Artist</p>
                        </div>
                    ))}
                </div>
            </section>
            {currentSong && <SongBar />}
        </main>
    );
};

export default HomePage;