import { useState } from "react";

import Icon from '@mui/material/Icon';

const Achievements = ({ darkMode }) => {
    const [streak, setStreak] = useState(0);
    const [badges, setBadges] = useState([]);

    return (
        <div className={`${darkMode ? "text-white " : "text-black  bg-green-100"} p-6 rounded-lg shadow-md mt-3 flex flex-col items-center`}>
            <h2 className={`${darkMode ? "text-white" : "text-black"} text-xl font-bold mb-2`}>Achievements</h2>
            <p>🔥 Streak: {streak} days</p>
            <button className="bg-blue-500 mt-1 mb-1 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base" onClick={() => setStreak(streak + 1)}>Inc.</button>
            <h3 className="text-lg font-bold mt-2">🏅 Badges:</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
                {badges.length > 0 ? badges.map((badge, index) => <li className=" border p-2" key={index}>{badge}</li>) : <li className=" border p-2">No badges yet</li>}
            </ul>

            <button className="mt-2" onClick={() => setBadges([...badges, "New Badge"])}>🏅</button>

        </div>
    );
};

export default Achievements;
