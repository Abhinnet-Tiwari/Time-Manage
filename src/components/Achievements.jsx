import { useState, useEffect } from "react";
import { FaEdit, FaMinus, FaRedoAlt, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

const Achievements = ({ darkMode }) => {
    const [streak, setStreak] = useState(0);
    const [badges, setBadges] = useState([]);
    const [totalDays, setTotalDays] = useState(0);
    const [isEditing, setIsEditing] = useState(false); 
    const [level, setLevel] = useState(1); 

    useEffect(() => {
        const savedStreak = localStorage.getItem("streak");
        const savedBadges = JSON.parse(localStorage.getItem("badges")) || [];
        const savedTotalDays = parseInt(localStorage.getItem("totalDays"), 10) || 0;
        const savedLevel = parseInt(localStorage.getItem("level"), 10) || 1;

        if (savedStreak) setStreak(parseInt(savedStreak, 10));
        if (savedBadges.length > 0) setBadges(savedBadges);
        if (savedTotalDays) setTotalDays(savedTotalDays);
        if (savedLevel) setLevel(savedLevel);
    }, []);

    useEffect(() => {
        localStorage.setItem("streak", streak);
        localStorage.setItem("badges", JSON.stringify(badges));
        localStorage.setItem("totalDays", totalDays);
        localStorage.setItem("level", level);
    }, [streak, badges, totalDays, level]);

    const incrementStreak = () => {
        setStreak(streak + 1);
        setTotalDays(totalDays + 1);
        if (streak + 1 >= 10) setLevel(2); 
        if (streak + 1 >= 30) setLevel(3); 
    };

    const decrementStreak = () => setStreak(streak > 0 ? streak - 1 : 0);

    const addBadge = () => {
        const newBadge = `🏅 Badge ${badges.length + 1}`;
        setBadges([...badges, newBadge]);
    };

    const removeBadge = (index) => {
        const updatedBadges = badges.filter((_, i) => i !== index);
        setBadges(updatedBadges);
    };

    const resetStreak = () => {
        if (window.confirm("Are you sure you want to reset your streak?")) {
            setStreak(0);
            setLevel(1);
        }
    };

    return (
        <div className={`${darkMode ? "text-white bg-gray-900" : "text-black bg-green-100"} p-6 rounded-lg shadow-md mt-3 flex flex-col items-center`}>
            <h2 className={`${darkMode ? "text-white" : "text-black"} text-xl font-bold mb-2`}>
                <FaTrophy className="inline-block mr-2" /> 🏆 Achievements
            </h2>

            {/* 🔥 Streak Display */}
            <p className="text-lg font-semibold">🔥 Streak: {streak} days</p>
            {streak >= 5 && streak < 10 && (
                <motion.p className="text-green-500 font-semibold mt-2">🎉 You're on fire! Keep it up!</motion.p>
            )}
            {streak >= 10 && streak < 20 && (
                <motion.p className="text-yellow-500 font-semibold mt-2">🌟 Great job! You're unstoppable!</motion.p>
            )}
            {streak >= 20 && (
                <motion.p className="text-red-500 font-semibold mt-2">🔥 Streak Master! You're a legend!</motion.p>
            )}
            <div className="mt-2 flex items-center gap-2">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
                    onClick={incrementStreak}
                >
                    Increase Streak
                </button>
                {isEditing && (
                    <button
                        className="bg-red-500 text-white rounded-full p-1 text-xs"
                        onClick={decrementStreak}
                    >
                        <FaMinus />
                    </button>
                )}
            </div>

            {/* Level Display */}
            <div className="mt-4">
                <p className="text-lg font-semibold">Level: {level}</p>
                {level >= 2 && <motion.p className="text-yellow-500 mt-1">🎉 You've leveled up!</motion.p>}
            </div>

            {/* Total Days Logged */}
            <div className="mt-4">
                <p className="text-lg font-semibold">Total Days Logged: {totalDays}</p>
                {totalDays >= 10 && (
                    <motion.p className="text-green-500 font-semibold mt-2">🏅 Awesome! You've been consistent!</motion.p>
                )}
            </div>

            {/* 🏅 Badges Section */}
            <h3 className="text-lg font-bold mt-4">🏅 Badges:</h3>
            <div className="mt-2 flex flex-wrap gap-3 justify-center items-center">
                {badges.length > 0 ? (
                    badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            className="relative flex items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span
                                className="bg-gradient-to-r from-yellow-400 to-red-500 text-white px-6 py-3 rounded-full shadow-md border border-yellow-300 transform transition duration-300 hover:scale-110"
                            >
                                {badge}
                            </span>
                            {isEditing && (
                                <button
                                    className="bg-red-500 text-white rounded-full  text-xs absolute top-0 right-0 -mt-1 -mr-1"
                                    onClick={() => removeBadge(index)}
                                >
                                    <FaMinus />
                                </button>
                            )}
                        </motion.div>
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

            {/* Edit Button */}
            <button
                className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
                onClick={() => setIsEditing(!isEditing)}
            >
                <FaEdit size={20} />
                {isEditing ? " Stop Editing" : " Edit"}
            </button>

            {/* Reset Streak Button */}
            <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 flex items-center justify-center"
                onClick={resetStreak}
            >
                <FaRedoAlt size={20} />
                Reset Streak
            </button>
        </div>
    );
};

export default Achievements;
