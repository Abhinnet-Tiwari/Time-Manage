import { motion } from "framer-motion";
import SyllabusInput from "./SyllabusInput";

const SubjectList = ({ darkMode, subjects, setSubjects }) => {
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto
            ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
            <h3 className="text-xl font-bold mb-3 text-center">📖 Subjects List</h3>
            <ul className="space-y-4">
                {subjects.map((sub, index) => (
                    <motion.li
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-lg">
                                <strong>{sub.name}</strong> - ⭐ {sub.stars} - ⏱ {sub.timeSpent} hrs
                            </span>
                            <span className="space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow-md"
                                    onClick={() => editSubject(index)}
                                >
                                    ✏️ Edit
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md"
                                    onClick={() => removeSubject(sub.name)}
                                >
                                    ❌ Remove
                                </motion.button>
                            </span>
                        </div>
                        <SyllabusInput darkMode={darkMode} subject={sub} subjects={subjects} setSubjects={setSubjects} />
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default SubjectList;
