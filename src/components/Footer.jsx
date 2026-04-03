import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const sections = [
    { title: "Company", links: ["About", "Jobs", "For the Record"] },
    { title: "Communities", links: ["For Artists", "Developers", "Advertising", "Investors", "Vendors"] },
    { title: "Useful links", links: ["Support", "Free Mobile App", "Popular by Country", "Import your music"] },
    { title: "Spotify Plans", links: ["Premium Duo", "Premium Family", "Premium Student", "Spotify Free"] }
];

const social = [
    { icon: FaInstagram, href: "#" },
    { icon: FaTwitter, href: "#" },
    { icon: FaFacebook, href: "#" }
];
const Footer = () => (
    <footer className="px-8 py-12 bg-white border-t border-gray-200">
        <div className="flex flex-wrap justify-between gap-8 mb-12">
            <div className="flex flex-wrap gap-16">
                {sections.map(s => (
                    <div key={s.title}>
                        <h3 className="font-bold text-gray-900 mb-4">{s.title}</h3>
                        <ul className="space-y-3">
                            {s.links.map(l => (
                                <li key={l}><a href="#" className="text-gray-600 hover:text-gray-900 hover:underline transition-colors">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="flex gap-4">
                {social.map((s, i) => (
                    <h2 key={i} className="p-3 w-fit h-fit hover:bg-gray-200 transition-all hover:scale-110 bg-gray-100 rounded-full">
                        <s.icon className="text-xl" />
                    </h2>
                ))}
            </div>
        </div>
        <div className="pt-8 border-t border-gray-500 text-gray-500 text-sm">
            © {new Date().getFullYear()} Spotify Abdullah
        </div>
    </footer>
);

export default Footer;