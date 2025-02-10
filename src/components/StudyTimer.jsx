
import Countdown from "react-countdown";
import { motion } from "framer-motion";

const StudyTimer = ({ darkMode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-lg shadow-lg text-center 
            ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
            <h2 className="text-2xl font-bold mb-3">⏳ Study Timer (Pomodoro)</h2>
            <motion.div
                className="text-3xl font-semibold py-4 px-6 rounded-lg"
                style={{ background: darkMode ? "#2D3748" : "#EDF2F7" }}
                whileHover={{ scale: 1.05 }}
            >
                <Countdown date={Date.now() + 25 * 60 * 1000} />
            </motion.div>
            <p className="mt-3 text-lg">🎯 Stay focused! Take a 5-minute break after each session.</p>
        </motion.div>
    );
};

export default StudyTimer;
