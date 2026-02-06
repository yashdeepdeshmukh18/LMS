const Navbar = () => {
    return (
        <header className="nav-bar">
            <h1 className="text-xl font-bold">SmaranAI.in</h1>

            <nav className="flex gap-10 text-lg">
                <span className="cursor-pointer">HOME</span>
                <span className="cursor-pointer border-b-2 border-purple-600">
                    COURSES
                </span>
                <span className="cursor-pointer">DASHBOARD</span>
            </nav>

            <button className="primary-btn">PREMIUM 👑</button>
        </header>
    );
};

export default Navbar;
