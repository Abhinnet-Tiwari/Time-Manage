import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import SubjectInput from "./components/SubjectInput";
import StudyPlan from "./components/StudyPlan";
import NotesDiary from "./components/NotesDiary";
import Achievements from "./components/Achievements";
import StudyTimer from "./components/StudyTimer";
import FloatingButton from "./components/FloatingButton";
import LandingPage from "./components/LandingPage";
import ProgressChart from "./components/ProgressChart";
import ChatGPT from "./components/ChatGPT";
import JokesAndQuotes from "./components/JokesAndQuotes";
import Game from "./components/Game"; 

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [dailyStudyTime, setDailyStudyTime] = useState(0);
  const [showScheduler, setShowScheduler] = useState(false);
  const [gameVisible, setGameVisible] = useState(false); 

  const notify = (message) => {
    toast.info(message, { position: "top-right", autoClose: 3000 });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      notify("Time to study your next subject!");
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    const storedTime = JSON.parse(localStorage.getItem("dailyStudyTime")) || 0;
    setSubjects(storedSubjects);
    setDailyStudyTime(storedTime);
  }, []);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
    localStorage.setItem("dailyStudyTime", JSON.stringify(dailyStudyTime));
  }, [subjects, dailyStudyTime]);

  const handleAddSubject = () => {
    const subjectName = prompt("Enter the new subject:");
    if (!subjectName || subjectName.trim() === "") return;

    const newSubject = {
      name: subjectName.trim(),
      stars: 3,
      syllabus: [],
    };

    setSubjects((prevSubjects) => {
      const updatedSubjects = [...prevSubjects, newSubject];
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
      return updatedSubjects;
    });

    notify(`Added new subject: ${subjectName}`);
  };

  if (!showScheduler) {
    return <LandingPage onGetStarted={() => setShowScheduler(true)} />;
  }

  return (
    <div
      className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        } min-h-screen flex flex-col`}
    >
      <button
        className="absolute top-4 right-4 p-2 bg-gray-600 text-white rounded"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? (
          <FaSun className="text-yellow-500" />
        ) : (
          <FaMoon className="text-blue-500" />
        )}
      </button>
      <ToastContainer />

      {!gameVisible && (
        <button
          onClick={() => setGameVisible(true)} 
          className="mb-4 p-2 bg-green-500 text-white rounded"
          style={{ marginTop: "20px" }}
        >
          Start Game
        </button>
      )}

      {gameVisible && (
        <div className="game-container-overlay">
          <Game
            startGame={() => setGameVisible(true)} 
            stopGame={() => setGameVisible(false)} 
          />
        </div>
      )}

      <StudyTimer darkMode={darkMode} />
      <JokesAndQuotes darkMode={darkMode} />

      <h1 className="text-3xl font-bold text-center mt-4">Student Study Scheduler</h1>
      <div className="flex flex-col items-center justify-center">
        <input
          type="number"
          placeholder="Total Study Time (hrs)"
          value={dailyStudyTime}
          min="0"
          onChange={(e) => setDailyStudyTime(Number(e.target.value))}
          className="my-4 p-2 border border-gray-700 rounded"
        />
        <button
          onClick={() => setDailyStudyTime(dailyStudyTime)}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Set Time
        </button>
      </div>

      <SubjectInput darkMode={darkMode} subjects={subjects} setSubjects={setSubjects} />
      <StudyPlan darkMode={darkMode} subjects={subjects} dailyStudyTime={dailyStudyTime} />
      <NotesDiary darkMode={darkMode} />
      <Achievements darkMode={darkMode} />
      <FloatingButton onClick={handleAddSubject} />
      <ProgressChart darkMode={darkMode} />
      <ChatGPT darkMode={darkMode} />
    </div>
  );
};

export default App;
