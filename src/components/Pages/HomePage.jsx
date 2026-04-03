import React from 'react'
import songs from "../../assets/songs.json"

const HomePage = () => {
    return (
        <main className='px-4 py-2'>
            <section className='border-b border-b-gray-500'>
                <h1 className='text-2xl font-bold font-mono'>Good morning</h1>
                <h2 className='text-xl font-bold font-sans'>Trending now</h2>
                <div className="flex flex-wrap gap-4 py-4">
                    {songs.map((song, index) => (
                        <div key={song.id} className="song bg-gray-300 p-4 rounded-lg relative">
                            <img className='w-32 h-32 object-cover' src={song.image} alt={song.title} />
                            <p className='font-bold font-sans'>{song.title}</p>
                            <p className='text-sm text-gray-600 font-sans'>{song.artist.name}</p>
                            <button className='absolute bottom-2 right-2 bg-green-500 text-white px-2 py-0.5 rounded-lg'>Play</button>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default HomePage