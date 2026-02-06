const Footer = () => {
    return (
        <footer className="border-t mt-12 px-10 py-6 text-sm">
            <div className="grid grid-cols-3 gap-6">
                <div>
                    <h4 className="font-semibold">SmaranAI.in</h4>
                    <p className="mt-2">Learn smart with Smaran AI</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">About Company</h4>
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms & Conditions</p>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Community</h4>
                    <p className="cursor-pointer">Learners</p>
                    <p className="cursor-pointer">Partners</p>
                </div>
            </div>

            <p className="text-center text-xs mt-6">
                © 2025, All rights reserved
            </p>
        </footer>
    );
};

export default Footer;
