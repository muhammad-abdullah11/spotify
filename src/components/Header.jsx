import { useState } from "react";
import { FaHome, FaSearch, FaSpotify, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton, useUser } from "@clerk/clerk-react";

const links = [
  { name: "Premium", path: "#" },
  { name: "Help", path: "#" }
];

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    return (
        <header className="px-4 md:px-6 py-3 flex justify-between items-center bg-white border-b sticky top-0 z-[100] shadow-sm">
            <div className="flex items-center gap-4 md:gap-8">
                <Link to="/" className="flex items-center gap-2 text-black">
                    <FaSpotify className="text-3xl text-[#1DB954]" />
                    <span className="text-xl font-bold tracking-tighter">Spotify</span>
                </Link>
                <div className="hidden md:flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="p-3 bg-gray-100 rounded-full hover:scale-105 transition-all">
                        <FaHome className="text-xl" />
                    </button>
                    <div onClick={() => navigate('/search')} className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2.5 w-[300px] lg:w-[450px] cursor-text transition-all">
                        <FaSearch className="text-gray-500" />
                        <span className="text-sm text-gray-500 font-medium whitespace-nowrap">What do you want to listen to?</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex gap-6 items-center">
                    {links.map(n => (
                        <Link key={n.name} to={n.path} className="text-sm font-bold text-gray-600 hover:text-black transition-all">{n.name}</Link>
                    ))}
                    <SignedOut>
                        <SignUpButton mode="modal">
                            <button className="text-sm font-bold text-gray-500 hover:text-black hover:scale-105 transition-all">Sign up</button>
                        </SignUpButton>
                        <SignInButton mode="modal">
                            <button className="text-sm font-bold bg-black text-white px-6 py-3 rounded-full hover:scale-105 transition-all">Log in</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <span className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all cursor-default">
                            <FaUserCircle className="text-xl" />
                            {user?.firstName || user?.username || "User"}
                        </span>
                        <SignOutButton>
                            <button className="text-sm font-bold bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-full transition-all hover:scale-105">Log out</button>
                        </SignOutButton>
                    </SignedIn>
                </div>
                
                <button 
                    className="md:hidden text-2xl p-2 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-[100%] left-0 w-full bg-white border-b flex flex-col p-6 gap-6 md:hidden animate-in slide-in-from-top duration-300 shadow-xl">
                    <div className="flex flex-col gap-4">
                        <button 
                            onClick={() => { navigate('/'); setIsOpen(false); }} 
                            className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl font-bold active:scale-95 transition-all"
                        >
                            <FaHome className="text-xl" />
                            Home
                        </button>
                        <button 
                            onClick={() => { navigate('/search'); setIsOpen(false); }} 
                            className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl font-bold active:scale-95 transition-all"
                        >
                            <FaSearch className="text-xl" />
                            Search
                        </button>
                    </div>
                    <div className="h-[1px] bg-gray-100" />
                    {links.map(n => (
                        <Link 
                            key={n.name} 
                            to={n.path} 
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-bold text-gray-700 hover:text-[#1DB954] transition-all px-4"
                        >
                            {n.name}
                        </Link>
                    ))}
                    <SignedOut>
                        <SignUpButton mode="modal">
                            <button onClick={() => setIsOpen(false)} className="text-lg font-bold text-left text-gray-500 hover:text-black transition-all px-4 py-2">Sign up</button>
                        </SignUpButton>
                        <SignInButton mode="modal">
                            <button onClick={() => setIsOpen(false)} className="text-lg font-bold bg-black text-white px-8 py-3 rounded-full hover:scale-105 transition-all ml-4 self-start">Log in</button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <span className="flex items-center gap-2 text-lg font-bold text-white bg-black px-6 py-3 rounded-full self-start ml-4 w-max cursor-default">
                            <FaUserCircle className="text-2xl" />
                            {user?.firstName || user?.username || "User"}
                        </span>
                        <SignOutButton>
                            <button onClick={() => setIsOpen(false)} className="text-lg font-bold bg-gray-100 hover:bg-gray-200 text-black px-8 py-3 rounded-full transition-all ml-4 self-start mt-2">Log out</button>
                        </SignOutButton>
                    </SignedIn>
                </div>
            )}
        </header>
    );
};

export default Header;