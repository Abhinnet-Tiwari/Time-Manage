import { FaStar } from "react-icons/fa";
import SyllabusInput from "./SyllabusInput";
import { useState } from "react";
import { motion } from "framer-motion";

const SubjectInput = ({darkMode, subjects, setSubjects }) => {
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

        // Reset the input fields and error state
        setSubject("");
        setStars(3);
        setTimeSpent("");
        setError("");
    };

    const removeSubject = (name) => {
        const updatedSubjects = subjects.filter((sub) => sub.name !== name);
        setSubjects(updatedSubjects);
        localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
    };

    const editSubject = (index) => {
        const newName = prompt("Edit Subject Name", subjects[index].name);
        if (newName) {
            const updatedSubjects = [...subjects];
            updatedSubjects[index].name = newName.trim();
            setSubjects(updatedSubjects);
            localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
        }
    };

    const boxShadowStyle = {
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
  };


    return (
        <div className="space-y-6">
            {/* Add Subject Section */}
            <div style={boxShadowStyle} className="p-4  rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto">
                <h2 className="text-lg sm:text-xl font-bold mb-2">Add Subject</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    className={`${darkMode ? "text-white" : "text-black"} border p-2 text-bold w-full mb-2 text-sm sm:text-base`}
                    type="text"
                    placeholder="Subject Name"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onKeyDown={addSubject}
                />
                {/* Star rating input */}
                <div className="flex space-x-1 mt-2 mb-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <FaStar
                            key={num}
                            className={
                                num <= stars
                                    ? "text-yellow-400 cursor-pointer"
                                    : "text-gray-300 cursor-pointer"
                            }
                            onClick={() => setStars(num)}
                            size={24}
                        />
                    ))}
                </div>
                {/* Time Spent input */}
                <input
                    className={`${darkMode ? "text-white" : "text-black"} border text-bold p-2 w-full mb-2 text-sm sm:text-base`}
                    type="number"
                    placeholder="Time Spent (hrs)"
                    value={timeSpent}
                    min="0"
                    step="0.1"
                    onChange={(e) => setTimeSpent(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base"
                    onClick={addSubject}
                >
                    Add Subject
                </button>
            </div>

            {/* Subjects List */}
            <motion.div
                style={boxShadowStyle}
                whileHover={{ scale: 1.05 }}
                className="p-4 mb-3 rounded-lg shadow-md transition-all w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto"
            >
                <h3 className="text-xl font-bold mb-2">Subjects List</h3>
                <ul className="space-y-4">
                    {subjects.map((sub, index) => (
                        <li key={index} className="border-b pb-2">
                            <div className="flex items-center justify-between">
                                <span>
                                    {sub.name} - ⭐ {sub.stars} - ⏱ {sub.timeSpent} hrs
                                </span>
                                <span className="space-x-2">
                                    <button
                                        onClick={() => editSubject(index)}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => removeSubject(sub.name)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </span>
                            </div>
                            {/* Render SyllabusInput for the subject */}
                            <SyllabusInput
                            darkMode={darkMode}
                                subject={sub}
                                subjects={subjects}
                                setSubjects={setSubjects}
                            />
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
};

export default SubjectInput;
