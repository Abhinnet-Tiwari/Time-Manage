
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

const getRandomColor = () => {
    const colors = [
        "rgba(255, 99, 132, 0.6)",   
        "rgba(54, 162, 235, 0.6)",   
        "rgba(255, 206, 86, 0.6)",   
        "rgba(75, 192, 192, 0.6)",   
        "rgba(153, 102, 255, 0.6)",  
        "rgba(255, 159, 64, 0.6)",   
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

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
                backgroundColor: subjects.map(() => getRandomColor()), 
                borderColor: "rgba(255, 255, 255, 0.6)",
                borderWidth: 1,
                borderRadius: 8, 
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top", labels: { color: darkMode ? "#ffffff" : "#000000" } },
            title: {
                display: true,
                text: "📊 Study Progress (Minutes)",
                color: darkMode ? "#ffffff" : "#000000",
                font: { size: 18, weight: "bold" },
            },
        },
        scales: {
            x: {
                ticks: { color: darkMode ? "#ffffff" : "#000000" },
                grid: { color: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)" },
            },
            y: {
                ticks: { color: darkMode ? "#ffffff" : "#000000" },
                grid: { color: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)" },
            },
        },
        animation: {
            duration: 1500,
            easing: "easeOutBounce",
        },
    };

    return (
        <div className={`${darkMode ? "text-white bg-gray-900" : "text-black bg-white"} p-6 rounded-lg shadow-lg my-4`}>
            <h2 className="text-2xl font-bold text-center mb-4">📈 Study Progress</h2>
            <div className="w-full h-80">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default ProgressChart;
