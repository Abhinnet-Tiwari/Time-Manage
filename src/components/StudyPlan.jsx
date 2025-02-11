
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
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} 
                            p-6 rounded-lg shadow-lg transition-all hover:bg-blue-100`}
                        key={index}
                    >
                        <h3 className="text-xl font-semibold mb-2 text-blue-600">
                            📚 {subject}
                        </h3>

                        <div className="flex items-center mb-2">
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: schedule[subject].priority > 3 ? "green" : "red" }}></div>
                            <p className="text-sm text-gray-500">
                                ⏳ {schedule[subject].time} study time
                            </p>
                        </div>

                        <div className="relative pt-2 pb-4">
                            <div className="absolute w-full h-1 bg-gray-300 rounded-full">
                                <div
                                    style={{
                                        width: `${Math.min(100, schedule[subject].priority * 20)}%`,
                                        backgroundColor: "#4CAF50",
                                    }}
                                    className="h-1 rounded-full"
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">{schedule[subject].priority} / 5 Priority</p>
                        </div>

                        <ul className="list-disc ml-4 mt-2 text-sm">
                            {schedule[subject].syllabus.map((topic, idx) => (
                                <li key={idx} className="text-gray-400">
                                    {topic}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 text-sm text-gray-400">
                            {schedule[subject].priority > 3
                                ? "Great! Keep up the good work!"
                                : "Focus more on this subject to improve your understanding."}
                        </div>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default StudyPlan;

