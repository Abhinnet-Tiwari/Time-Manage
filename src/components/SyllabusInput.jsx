
import { useState } from "react";
import TextField from '@mui/material/TextField';


const SyllabusInput = ({darkMode, subject, subjects, setSubjects }) => {
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
        <div>
            <h3 classNmae="mb-2 font-bold">{subject.name} Syllabus</h3>

            <TextField type="text" value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={addTopic} id="outlined-basic" label="Add Topic" variant="outlined" />

            <button className="text-white ml-5" onClick={addTopic}>Add Topic</button>
            <ul>
                {subject.syllabus && subject.syllabus.length > 0 ? (
                    subject.syllabus.map((t, index) => (
                        <li key={index}>
                            {t}
                            <button onClick={() => editTopic(index)}>Edit</button>
                        </li>
                    ))
                ) : (
                    <li>No syllabus items yet</li>
                )}

            </ul>
        </div>
    );
};

export default SyllabusInput;