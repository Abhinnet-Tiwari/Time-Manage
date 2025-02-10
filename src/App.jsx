


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
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen flex flex-col items-center`}
    >
      <button
        className="absolute top-4 right-4 p-2 bg-gray-600 text-white rounded-full shadow-lg"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-500" />}
      </button>

      <ToastContainer />

      {!gameVisible && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGameVisible(true)}
          className="mt-8 px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md"
        >
          Start Game
        </motion.button>
      )}

      {gameVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <Game darkMode={darkMode} startGame={() => setGameVisible(true)} stopGame={() => setGameVisible(false)} />
        </div>
      )}

      <h1 className="text-4xl font-bold text-center mt-6 mb-4">📚 Student Study Scheduler</h1>

      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full flex flex-col items-center"
      >
        <input
          type="number"
          placeholder="Total Study Time (hrs)"
          value={dailyStudyTime}
          min="0"
          onChange={(e) => setDailyStudyTime(Number(e.target.value))}
          className="my-4 p-3 border border-gray-700 rounded-lg shadow-md"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDailyStudyTime(dailyStudyTime)}
          className="mb-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow-md"
        >
          Set Time
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <StudyTimer darkMode={darkMode} />
        <JokesAndQuotes darkMode={darkMode} />
        <SubjectInput darkMode={darkMode} subjects={subjects} setSubjects={setSubjects} />
        <StudyPlan darkMode={darkMode} subjects={subjects} dailyStudyTime={dailyStudyTime} />
        <NotesDiary darkMode={darkMode} />
        <Achievements darkMode={darkMode} />
        <ProgressChart darkMode={darkMode} />
        <ChatGPT darkMode={darkMode} />
      </motion.div>

      <FloatingButton onClick={handleAddSubject} />
    </motion.div>
  );
};

export default App;
