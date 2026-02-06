import { useState, useRef, useEffect } from "react";
import {
    Save,
    MessageCircle,
    Download,
    Share2,
    ThumbsUp,
    ThumbsDown,
    Flag,
    Link,
    Mail,
    Twitter,
    Facebook,
    MoreVertical
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { tr } from "framer-motion/client";

const STORAGE_KEY = "courseActions";

const CourseActions = ({ lessonId }) => {
    const [shareOpen, setShareOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [disliked, setDisliked] = useState(false);
    const [flagged, setFlagged] = useState(false);
    const [saved, setSaved] = useState(false);
    const shareRef = useRef(null);
    const isFirstSave = useRef(true);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const actionsRef = useRef(null);


    // LOAD from storage per-lesson (or fallback to 'global' if no lessonId)
    useEffect(() => {
        // ensure the save effect will skip the immediate write while we load
        isFirstSave.current = true;
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
            const key = lessonId ?? "global";
            if (stored[key]) {
                setLiked(Boolean(stored[key].liked));
                setLikeCount(Number(stored[key].likes) || 0);
                setDisliked(Boolean(stored[key].disliked));
                setFlagged(Boolean(stored[key].flagged));
                setSaved(Boolean(stored[key].saved));
            } else {
                // Reset to defaults when switching lessons with no stored data
                setLiked(false);
                setLikeCount(0);
                setDisliked(false);
                setFlagged(false);
                setSaved(false);
            }
        } catch (err) {
            // ignore localStorage errors
            console.error("CourseActions load error", err);
        }
    }, [lessonId]);

    // SAVE to storage whenever state changes
    useEffect(() => {
        // Skip the first save right after load to avoid overwriting loaded values
        if (isFirstSave.current) {
            isFirstSave.current = false;
            return;
        }
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
            const key = lessonId ?? "global";
            stored[key] = {
                liked,
                likes: likeCount,
                disliked,
                flagged,
                saved
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        } catch (err) {
            console.error("CourseActions save error", err);
        }
    }, [liked, likeCount, disliked, flagged, saved, lessonId]);

    // close share dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (shareRef.current && !shareRef.current.contains(e.target)) {
                setShareOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // auto hide toast
    useEffect(() => {
        if (!showToast) return;
        const timer = setTimeout(() => setShowToast(false), 2000);
        return () => clearTimeout(timer);
    }, [showToast]);

    useEffect(() => {
        if (!mobileMenuOpen) return;

        const handleOutside = (e) => {
            if (!actionsRef.current?.contains(e.target)) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside);

        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("touchstart", handleOutside);
        };
    }, [mobileMenuOpen]);


    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowToast(true);
            setShareOpen(false);
        } catch (err) {
            console.error("Failed to copy link", err);
        }
    };

    const handleLike = () => {
        setLiked((prev) => {
            if (prev) {
                setLikeCount((c) => Math.max(0, c - 1));
                return false;
            } else {
                setLikeCount((c) => c + 1);
                setDisliked(false); // remove dislike if liking
                return true;
            }
        });
    };

    const handleDislike = () => {
        setDisliked((prev) => {
            if (!prev) {
                setLiked(false);
                setLikeCount(0);
            }
            return !prev;
        });
    };

    const handleFlag = () => {
        setFlagged(prev => !prev);
    };

    const handleSave = () => {
        setSaved(prev => !prev);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };


    return (
        <>

            {/* ACTION ROW */}
            <div className="course-actions" ref={actionsRef}>

                {/* LEFT ACTIONS */}
                <div className="course-actions-left desktop-only">
                    <span
                        onClick={handleSave}
                        className="cursor-pointer flex items-center gap-1 select-none"
                    >
                        <Save
                            size={16}
                            className={saved ? "text-purple-600" : "text-gray-700"}
                            fill={saved ? "#7c3aed" : "none"}
                        />
                        {saved ? "Saved" : "Save"}
                    </span>


                    <span
                        onClick={() => navigate(`/discussion/${lessonId}`)}
                        className="cursor-pointer flex items-center gap-1"
                    >
                        <MessageCircle size={16} /> Discuss
                    </span>

                    <button className="cursor-pointer flex items-center gap-1">
                        <Download size={16} /> Download
                    </button>
                </div>

                {/* RIGHT ACTIONS */}
                <div className="course-actions-right">

                    {/* SHARE */}
                    <div className="relative" ref={shareRef}>
                        <span
                            onClick={() => setShareOpen(!shareOpen)}
                            className="cursor-pointer flex items-center gap-1"
                        >
                            <Share2 size={16} /> Share
                        </span>

                        {shareOpen && (
                            <div className="absolute left-0 mt-2 w-56 bg-white border rounded shadow-md z-50">
                                <div
                                    onClick={handleCopyLink}
                                    className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-purple-50"
                                >
                                    <Link size={16} /> Copy link
                                </div>
                                <div className="px-4 py-2 flex items-center gap-2 hover:bg-purple-50 cursor-pointer">
                                    <Mail size={16} /> Share via Email
                                </div>
                                <div className="px-4 py-2 flex items-center gap-2 hover:bg-purple-50 cursor-pointer">
                                    <Twitter size={16} /> Share on Twitter
                                </div>
                                <div className="px-4 py-2 flex items-center gap-2 hover:bg-purple-50 cursor-pointer">
                                    <Facebook size={16} /> Share on Facebook
                                </div>
                            </div>
                        )}
                    </div>

                    <span
                        onClick={handleLike}
                        className="cursor-pointer flex items-center gap-1 select-none"
                    >
                        <ThumbsUp
                            size={16}
                            className={liked ? "text-yellow-500" : "text-gray-700"}
                            fill={liked ? "#facc15" : "none"}
                        />
                        <span className="text-xs">{likeCount}</span>
                    </span>

                    <span
                        onClick={handleDislike}
                        className="cursor-pointer select-none"
                    >
                        <ThumbsDown
                            size={16}
                            className={disliked ? "text-yellow-500" : "text-gray-700"}
                            fill={disliked ? "#facc15" : "none"}
                        />
                    </span>

                    <span
                        onClick={handleFlag}
                        className="cursor-pointer select-none"
                    >
                        <Flag
                            size={16}
                            className={flagged ? "text-red-600" : "text-gray-700"}
                            fill={flagged ? "#dc2626" : "none"}
                        />
                    </span>

                    {/* MOBILE MORE MENU */}
                    <div className="mobile-only relative">
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 rounded hover:bg-purple-50"
                        >
                            <MoreVertical size={16} />
                        </button>

                        {mobileMenuOpen && (
                            <div>
                                {/* MENU */}
                                <div
                                    className="absolute right-0 top-full mt-2
                w-40 bg-white border border-purple-200
                rounded-lg z-50"
                                    onClick={(e) => e.stopPropagation()} // ✅ prevent close when clicking menu
                                >
                                    {/* SAVE */}
                                    <div
                                        onClick={() => {
                                            handleSave();
                                            setMobileMenuOpen(true);
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-purple-50 bg-purple-50"
                                    >
                                        <Save size={18}
                                            className={saved ? "text-purple-600" : "text-gray-700"}
                                            fill={saved ? "#7c3aed" : "none"}
                                        />
                                        <span>{saved ? "Saved" : "Save"}</span>
                                    </div>

                                    {/* DISCUSS */}
                                    <div
                                        onClick={() => {
                                            navigate(`/discussion/${lessonId}`);
                                            setMobileMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-purple-50 bg-purple-50"
                                    >
                                        <MessageCircle size={18} />
                                        <span>Discuss</span>
                                    </div>

                                    {/* DOWNLOAD */}
                                    <div
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-purple-50 bg-purple-50"
                                    >
                                        <Download size={18} />
                                        <span>Download</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                </div>
            </div>

            {/* TOAST */}
            {showToast && (
                <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow-lg text-sm">
                    Link copied to clipboard
                </div>
            )}
        </>
    );
};

export default CourseActions;
