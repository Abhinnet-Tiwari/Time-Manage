
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { motion } from "framer-motion";

const SyllabusInput = ({ darkMode, subject, subjects, setSubjects }) => {
    const [topic, setTopic] = useState("");

    const addTopic = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            if (!topic.trim()) return;

            const updatedSubjects = subjects.map((sub) =>
                sub.name === subject.name ? { ...sub, syllabus: [...sub.syllabus, topic] } : sub
            );
            setSubjects(updatedSubjects);
            setTopic("");
        }
    };

    const editTopic = (topicIndex) => {
        const newTopic = prompt("Edit Topic", subject.syllabus[topicIndex]);
        if (newTopic) {
            const updatedSubjects = subjects.map((sub) => {
                if (sub.name === subject.name) {
                    const updatedSyllabus = [...sub.syllabus];
                    updatedSyllabus[topicIndex] = newTopic;
                    return { ...sub, syllabus: updatedSyllabus };
                }
                return sub;
            });
            setSubjects(updatedSubjects);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} 
                p-6 rounded-lg shadow-xl border border-gray-300`}
        >
            <h3 className="mb-3 text-lg font-bold text-center">
                📖 {subject.name} Syllabus
            </h3>

            <div className="flex gap-3 items-center">
                <TextField
                    type="text"
                    value={topic}
                    InputLabelProps={{
                        sx: {
                            color: darkMode ? '#ffffff' : '#000000',
                            '&.Mui-focused': { color: darkMode ? '#ffffff' : '#000000' },
                        },
                    }}
                    sx={{
                        input: { color: darkMode ? 'white' : 'black' },
                        width: "100%",
                    }}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={addTopic}
                    label="Add Topic"
                    variant="outlined"
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                    onClick={addTopic}
                >
                    ➕ Add
                </motion.button>
            </div>

            <ul className="mt-4 space-y-2">
                {subject.syllabus && subject.syllabus.length > 0 ? (
                    subject.syllabus.map((t, index) => (
                        <motion.li
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="flex justify-between items-center bg-gray-200 dark:bg-gray-800 p-2 rounded-md"
                        >
                            <span className="text-gray-700 dark:text-gray-300">{t}</span>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md transition-all"
                                onClick={() => editTopic(index)}
                            >
                                ✏️ Edit
                            </motion.button>
                        </motion.li>
                    ))
                ) : (
                    <li className="text-gray-500 text-center">No syllabus items yet</li>
                )}
            </ul>
        </motion.div>
    );
};

export default SyllabusInput;
