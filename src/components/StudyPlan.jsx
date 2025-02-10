
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { generateAIStudyPlan } from "../utils/generatePlan";

const StudyPlan = ({ darkMode, subjects, dailyStudyTime, userPreferences }) => {
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        if (subjects.length > 0 && dailyStudyTime > 0) {
            const newSchedule = generateAIStudyPlan(subjects, dailyStudyTime, userPreferences);
            setSchedule(newSchedule);
        } else {
            setSchedule({});
        }
    }, [subjects, dailyStudyTime, userPreferences]);

    if (!subjects.length || dailyStudyTime === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center text-lg font-semibold text-gray-500"
            >
                No subjects available or study time not set.
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} 
                p-6 rounded-lg shadow-xl border border-gray-300`}
        >
            <h2 className="text-2xl font-bold text-center mb-4">
                🎯 AI-Recommended Study Plan
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(schedule).map((subject, index) => (
                    <motion.li
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} 
                            p-4 rounded-lg shadow-md transition-all`}
                        key={index}
                    >
                        <h3 className="text-xl font-semibold mb-2">
                            📚 {subject}
                        </h3>
                        <p className="text-sm text-gray-500">
                            ⏳ {schedule[subject].time} study time
                        </p>
                        <ul className="list-disc ml-4 mt-2 text-sm">
                            {schedule[subject].syllabus.map((topic, idx) => (
                                <li key={idx} className="text-gray-400">
                                    {topic}
                                </li>
                            ))}
                        </ul>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default StudyPlan;
