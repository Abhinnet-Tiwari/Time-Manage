import { useState, useEffect } from "react";

const Achievements = ({ darkMode }) => {
    const [streak, setStreak] = useState(0);
    const [badges, setBadges] = useState([]);

    useEffect(() => {
        const savedStreak = localStorage.getItem("streak");
        const savedBadges = JSON.parse(localStorage.getItem("badges")) || [];

        if (savedStreak) setStreak(parseInt(savedStreak, 10));
        if (savedBadges.length > 0) setBadges(savedBadges);
    }, []);

    useEffect(() => {
        localStorage.setItem("streak", streak);
        localStorage.setItem("badges", JSON.stringify(badges));
    }, [streak, badges]);

    const incrementStreak = () => setStreak(streak + 1);

    const addBadge = () => {
        const newBadge = `🏅 Badge ${badges.length + 1}`;
        setBadges([...badges, newBadge]);
    };

    return (
        <div className={`${darkMode ? "text-white bg-gray-900" : "text-black bg-green-100"} p-6 rounded-lg shadow-md mt-3 flex flex-col items-center`}>
            <h2 className={`${darkMode ? "text-white" : "text-black"} text-xl font-bold mb-2`}>🏆 Achievements</h2>

            {/* 🔥 Streak Display */}
            <p className="text-lg font-semibold">🔥 Streak: {streak} days</p>
            <button
                className="bg-blue-500 hover:bg-blue-600 mt-2 text-white px-4 py-2 rounded-lg transition duration-300"
                onClick={incrementStreak}
            >
                Increase Streak
            </button>

            {/* 🏅 Badges Section */}
            <h3 className="text-lg font-bold mt-4">🏅 Badges:</h3>
            <div className="mt-2 flex flex-wrap gap-3 justify-center items-center">
                {badges.length > 0 ? (
                    badges.map((badge, index) => (
                        <span
                            key={index}
                            className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-4 py-2 rounded-full shadow-md border border-yellow-300"
                        >
                            {badge}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-500">No badges yet</span>
                )}
            </div>

            {/* 🏅 Add Badge Button */}
            <button
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                onClick={addBadge}
            >
                🏅 Earn New Badge
            </button>
        </div>
    );
};

export default Achievements;
