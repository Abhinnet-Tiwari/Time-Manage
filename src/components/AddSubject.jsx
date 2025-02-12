
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const SubjectInput = ({ darkMode, subjects, setSubjects }) => {
    const [subject, setSubject] = useState("");
    const [stars, setStars] = useState(3);
    const [timeSpent, setTimeSpent] = useState("");
    const [error, setError] = useState("");

    const addSubject = (e) => {
        if (e.type === "keydown" && e.key !== "Enter") return;

        if (!subject.trim()) {
            setError("Subject name cannot be empty.");
            return;
        }
        if (stars < 1 || stars > 5) {
            setError("Stars must be between 1 and 5.");
            return;
        }
        const parsedTimeSpent = parseFloat(timeSpent);
        if (isNaN(parsedTimeSpent) || parsedTimeSpent < 0) {
            setError("Time Spent must be a non-negative number.");
            return;
        }

        const newSubject = {
            name: subject.trim(),
            stars,
            syllabus: [],
            timeSpent: parsedTimeSpent,
        };

        const updatedSubjects = [...subjects, newSubject];
        setSubjects(updatedSubjects);
        localStorage.setItem("subjects", JSON.stringify(updatedSubjects));

        setSubject("");
        setStars(3);
        setTimeSpent("");
        setError("");
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto
                ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
            >
                <h2 className="text-xl font-bold mb-3 text-center">📚 Add Subject</h2>
                {error && <p className="text-red-500 mb-3">{error}</p>}

                <input
                    className={`border p-2 w-full mb-3 rounded-md focus:outline-none ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}
                    type="text"
                    placeholder="Enter Subject Name"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onKeyDown={addSubject}
                />

                <div className="flex justify-center space-x-2 mb-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <FaStar
                            key={num}
                            className={num <= stars ? "text-yellow-400 cursor-pointer" : "text-gray-400 cursor-pointer"}
                            onClick={() => setStars(num)}
                            size={24}
                        />
                    ))}
                </div>

                <input
                    className={`border p-2 w-full mb-3 rounded-md focus:outline-none ${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}
                    type="number"
                    placeholder="Time Spent (hrs)"
                    value={timeSpent}
                    min="0"
                    step="0.1"
                    onChange={(e) => setTimeSpent(e.target.value)}
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-500 text-white w-full py-2 rounded-md shadow-md"
                    onClick={addSubject}
                >
                    ➕ Add Subject
                </motion.button>
            </motion.div>
        </div>
    );
};

export default SubjectInput;
