import { useState } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const NotesDiary = ({ darkMode }) => {
    const [notes, setNotes] = useState([]); // Local state for storing notes
    const [note, setNote] = useState("");
    const [editingIndex, setEditingIndex] = useState(null); // For editing note

    const addNote = () => {
        if (note) {
            if (editingIndex !== null) {
                // Update the existing note if we are editing
                const updatedNotes = [...notes];
                updatedNotes[editingIndex] = note;
                setNotes(updatedNotes);
                setEditingIndex(null);
            } else {
                // Add new note
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
    const boxShadowStyle = {
        boxShadow: '0px 4px 26px rgba(0, 0, 0, 0.6)',
    };

    return (
        <div className={`${darkMode ? "text-white " : "text-black  bg-blue-100 "} p-6  rounded-lg shadow-md`}>
            <h2 className="text-lg font-bold mt-2 mb-1">Notes Diary..</h2>
            <Box className={`center`} sx={{ width: 500, maxWidth: '100%' }}>
                <TextField style={boxShadowStyle} fullWidth value={note} onChange={(e) => setNote(e.target.value)} label="Write your notes here..." id="fullWidth" />
            </Box>
            <button className="mt-2 mb-1 text-white" onClick={addNote}>{editingIndex !== null ? "Update Note" : "Save Note"}</button>
            <ul className="list-disc font-bold text-black">
                {notes.map((n, index) => (
                    <li className=" ml-3 mt-2" key={index}>
                        {n}
                        <button className=" ml-3  text-blue-500 hover:underline" onClick={() => editNote(index)}>Edit</button>
                        <button className=" ml-3 text-red-500 hover:underline" onClick={() => removeNote(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesDiary;
