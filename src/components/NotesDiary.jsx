import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { motion } from "framer-motion";

const NotesDiary = ({ darkMode }) => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("notesDiary")) || [];
        setNotes(storedNotes);
    }, []);

    useEffect(() => {
        localStorage.setItem("notesDiary", JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (note.trim()) {
            if (editingIndex !== null) {
                const updatedNotes = [...notes];
                updatedNotes[editingIndex] = note;
                setNotes(updatedNotes);
                setEditingIndex(null);
            } else {
                setNotes([...notes, note]);
            }
            setNote("");
        }
    };

    const editNote = (index) => {
        setNote(notes[index]);
        setEditingIndex(index);
    };

    const removeNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            addNote();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`p-6 rounded-lg shadow-lg text-center 
            ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
        >
            <h2 className="text-2xl font-bold mb-4">📖 Notes Diary</h2>
            <Box className="w-full max-w-lg mx-auto">
                <TextField
                    fullWidth
                    onKeyDown={handleKeyDown}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    label="Write your notes here..."
                    variant="outlined"
                    InputLabelProps={{
                        sx: {
                            color: darkMode ? "#ffffff" : "#000000",
                            "&.Mui-focused": { color: darkMode ? "#ffffff" : "#000000" },
                        },
                    }}
                    sx={{
                        input: { color: darkMode ? "white" : "black" },
                        bgcolor: darkMode ? "#2D3748" : "#F7FAFC",
                        borderRadius: "8px",
                    }}
                />
            </Box>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md"
                onClick={addNote}
            >
                {editingIndex !== null ? "Update Note" : "Save Note"}
            </motion.button>
            <ul className="mt-4 text-left space-y-3">
                {notes.map((n, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-center"
                    >
                        <span>{n}</span>
                        <div className="space-x-3">
                            <button className="text-blue-500 hover:underline" onClick={() => editNote(index)}>
                                Edit
                            </button>
                            <button className="text-red-500 hover:underline" onClick={() => removeNote(index)}>
                                Remove
                            </button>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default NotesDiary;
