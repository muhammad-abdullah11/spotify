import { FaHome, FaSearch, FaSpotify } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const links = [{ name: "Premium", path: "#" }, { name: "Help", path: "#" }, { name: "Download", path: "#" }, { name: "Sign up", path: "#" }, { name: "Log in", path: "#" }];

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="px-6 py-3 flex justify-between items-center bg-white border-b sticky top-0 z-50">
            <div className="flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 text-black">
                    <FaSpotify className="text-3xl" />
                    <span className="text-xl font-bold tracking-tighter">Spotify</span>
                </Link>
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/')} className="p-3 bg-gray-100 rounded-full hover:scale-105 transition-all">
                        <FaHome className="text-xl" />
                    </button>
                    <div onClick={() => navigate('/search')} className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2.5 w-[400px] cursor-text transition-all">
                        <FaSearch className="text-gray-500" />
                        <span className="text-sm text-gray-500 font-medium">What do you want to listen to?</span>
                    </div>
                </div>
            </div>
            <div className="flex gap-6 items-center">
                {links.map(n => (
                    <Link key={n.name} to={n.path} className="text-sm font-bold text-gray-600 hover:text-black transition-all">{n.name}</Link>
                ))}
            </div>
        </header>
    );
};

export default Header;