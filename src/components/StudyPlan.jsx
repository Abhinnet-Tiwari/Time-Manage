import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { generateAIStudyPlan } from "../utils/generatePlan";

const StudyPlan = ({darkMode, subjects, dailyStudyTime, userPreferences }) => {
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
        return <div>No subjects available or study time not set.</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${darkMode ? " text-white" : "text - black bg-white"} p-4  rounded-lg shadow-md`}
        >

            <h2 className="text-lg font-bold mb-2">AI-Recommended Study Plan</h2>

            <ul className="flex ">
                {Object.keys(schedule).map((subject, index) => (
                    <motion.li whileHover={{ scale: 1.01 }} className="p-2 border m-2 " key={index}>
                        <strong>{subject}</strong>: {schedule[subject].time} study time
                        <ul className=" list-disc ml-4">
                            {schedule[subject].syllabus.map((topic, idx) => (
                                <li  key={idx}>{topic}</li>
                            ))}
                        </ul>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default StudyPlan;
