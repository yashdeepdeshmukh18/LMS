import { useEffect, useRef } from "react";

const VideoPlayer = ({ title , src, lessonId, onComplete }) => {
    const videoRef = useRef(null);

    // Load video & resume from last time
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const savedProgress =
            JSON.parse(localStorage.getItem("videoProgress")) || {};

        if (savedProgress[lessonId]) {
            video.currentTime = savedProgress[lessonId];
        }

        video.load();
    }, [src, lessonId]);

    // Save progress + detect completion
    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || !video.duration) return;

        const progress =
            JSON.parse(localStorage.getItem("videoProgress")) || {};

        progress[lessonId] = video.currentTime;
        localStorage.setItem("videoProgress", JSON.stringify(progress));

        // 90% completion rule
        if (video.currentTime / video.duration >= 0.9) {
            onComplete();
        }
    };

    // keyboard controls
    const handleKeyDown = (e) => {
        const video = videoRef.current;
        if (!video) return;

        // Ignore when typing in inputs or contenteditable areas
        const active = document.activeElement;
        const tag = active?.tagName;
        const isEditable = active?.isContentEditable;
        if (tag === "INPUT" || tag === "TEXTAREA" || isEditable) return;

        const isSpace = e.key === " " || e.key === "Spacebar" || e.code === "Space";
        if (isSpace) {
            // ignore repeated keydown events while holding space
            if (e.repeat) return;
            e.preventDefault();
            video.paused ? video.play() : video.pause();
            return;
        }

        switch (e.key) {
            case "ArrowRight": {
                const current = Number.isFinite(video.currentTime) ? video.currentTime : 0;
                const duration = Number.isFinite(video.duration) ? video.duration : NaN;
                const next = Number.isFinite(duration) ? Math.min(duration, current + 5) : current + 5;
                if (Number.isFinite(next)) video.currentTime = next;
                break;
            }

            case "ArrowLeft": {
                const current = Number.isFinite(video.currentTime) ? video.currentTime : 0;
                const prev = Math.max(0, current - 5);
                if (Number.isFinite(prev)) video.currentTime = prev;
                break;
            }

            case "m":
            case "M":
                video.muted = !video.muted;
                break;

            default:
                break;
        }
    };

    // Prevent native browser toggles on keyup (fixes resume-on-release)
    const handleKeyUp = (e) => {
        const isSpace = e.key === " " || e.key === "Spacebar" || e.code === "Space";
        if (isSpace) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    // attach / clean up listener
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <div className="mb-5 w-full">
            <div className="w-full aspect-video rounded-lg overflow-hidden bg-black">
                <video
                    ref={videoRef}
                    controls
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-contain"
                >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );

};

export default VideoPlayer;
