import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProgressChart = ({ darkMode }) => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const storedSubjects = localStorage.getItem("subjects");
        if (storedSubjects) {
            try {
                const parsedSubjects = JSON.parse(storedSubjects);
                setSubjects(parsedSubjects);
            } catch (error) {
                console.error("Error parsing stored subjects:", error);
            }
        }
    }, []);

    const data = {
        labels: subjects.map((subject) => subject.name),
        datasets: [
            {
                label: "Minutes Spent",
                data: subjects.map((subject) => (subject.timeSpent ? subject.timeSpent * 60 : 0)),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Study Progress (Minutes)" },
        },
    };

    return (
        <div className={`${darkMode ? "text-white bg-gray-400" : "text-black bg-white"} p-4   rounded-lg shadow-md my-4`}>
            <h2 className="text-xl font-bold mb-2">Study Progress</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ProgressChart;
