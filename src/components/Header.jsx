import { FaHome, FaSearch, FaSpotify } from "react-icons/fa";

const links = [{ name: "Premium", href: "#" }, { name: "Help", href: "#" }, { name: "Download", href: "#" }, { name: "Sign up", href: "#" }, { name: "Log in", href: "#" }];
const Header = () => (
    <header className="px-4 py-2 flex justify-between items-center gap-4 border-b border-gray-500">
        <div className="flex items-center gap-4">
            <h2 className="flex items-center gap-4" onClick={() => { window.location.href = "/" }}>
                <FaSpotify className="text-4xl" /><span className="text-2xl font-bold">Spotify</span>
            </h2>
            <FaHome className="text-4xl" onClick={() => { window.location.href = "/" }} />
            <div className="flex items-center gap-4 bg-gray-200 rounded px-2 py-1 group:focus-within:ring-2 focus:ring-gray-500">
                <FaSearch className="text-2xl" /><input type="text" placeholder="Search" className="border-none outline-none text-lg bg-transparent w-[500px]" />
            </div>
        </div>
        <div className="flex gap-6">
            {links.map(n => (
                <a key={n.name} href={n.href} className="text-lg hover:scale-110 hover:font-bold hover:underline transition-all">{n.name}</a>
            ))}
        </div>
    </header>
);

export default Header;