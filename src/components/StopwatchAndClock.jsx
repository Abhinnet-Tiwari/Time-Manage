

import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { motion } from "framer-motion";
import backgroundMusicFile from "../assets/destination-01.mp3";

const StopwatchAndClock = ({ darkMode }) => {
    const [stopwatchTime, setStopwatchTime] = useState(0);
    const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
    const [timerTime, setTimerTime] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [alarmSound, setAlarmSound] = useState(new Audio(backgroundMusicFile)); 
    const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const hours = Math.floor(minutes / 60);
        return `${hours < 10 ? "0" : ""}${hours}:${minutes % 60 < 10 ? "0" : ""}${minutes % 60}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    const updateCurrentTime = () => {
        setCurrentTime(new Date());
    };

    const handleStartStopwatch = () => {
        setIsStopwatchRunning(true);
    };

    const handlePauseStopwatch = () => {
        setIsStopwatchRunning(false);
    };

    const handleResetStopwatch = () => {
        setStopwatchTime(0);
        setIsStopwatchRunning(false);
    };

    const handleStartTimer = () => {
        setIsTimerRunning(true);
    };

    const handlePauseTimer = () => {
        setIsTimerRunning(false);
    };

    const handleResetTimer = () => {
        setTimerTime(0);
        setIsTimerRunning(false);
    };


    useEffect(() => {
        if (timerTime === 0 && isTimerRunning) {
            setIsTimerRunning(false); 
            setIsAlarmPlaying(true);
            alarmSound.play(); 
            setTimeout(() => {
                alarmSound.pause(); 
                alarmSound.currentTime = 0;
                setIsAlarmPlaying(false); 
            }, 3000); 
        }
    }, [timerTime, isTimerRunning, alarmSound]);

    useEffect(() => {
        let interval;
        if (isStopwatchRunning) {
            interval = setInterval(() => {
                setStopwatchTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isStopwatchRunning]);

    useEffect(() => {
        let interval;
        if (isTimerRunning && timerTime > 0) {
            interval = setInterval(() => {
                setTimerTime((prevTime) => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timerTime]);

    useEffect(() => {
        const clockInterval = setInterval(updateCurrentTime, 1000);
        return () => clearInterval(clockInterval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} p-8 rounded-xl shadow-xl w-full sm:w-96 md:w-112 lg:w-128 xl:w-144 text-center max-w-full mx-auto mt-10`}
        >
            <h1 className="text-2xl font-bold mb-6">⏱️ Stopwatch & Timer</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Current Time</h2>
                <p className="text-3xl font-mono mt-2">{currentTime.toLocaleTimeString()}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Stopwatch</h2>
                <p className="text-3xl font-mono mt-2">{formatTime(stopwatchTime)}</p>
                <div className="flex justify-center mt-4 space-x-4">
                    {!isStopwatchRunning ? (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStartStopwatch}
                            className="p-3 bg-green-500 text-white rounded-full"
                        >
                            <FaPlay size={24} />
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePauseStopwatch}
                            className="p-3 bg-yellow-500 text-white rounded-full"
                        >
                            <FaPause size={24} />
                        </motion.button>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetStopwatch}
                        className="p-3 bg-red-500 text-white rounded-full"
                    >
                        <FaStop size={24} />
                    </motion.button>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Set Timer</h2>
                <div className="flex justify-center mb-4">
                    <input
                        type="number"
                        value={Math.floor(timerTime / 3600)}
                        onChange={(e) => setTimerTime(e.target.value * 3600 + (timerTime % 3600))}
                        placeholder="Hours"
                        className="p-3 border border-gray-400 rounded-lg w-16 text-center"
                    />
                    <input
                        type="number"
                        value={Math.floor((timerTime % 3600) / 60)}
                        onChange={(e) => setTimerTime(e.target.value * 60 + (timerTime % 60))}
                        placeholder="Minutes"
                        className="p-3 border border-gray-400 rounded-lg w-16 text-center mx-2"
                    />
                    <input
                        type="number"
                        value={timerTime % 60}
                        onChange={(e) => setTimerTime(e.target.value)}
                        placeholder="Seconds"
                        className="p-3 border border-gray-400 rounded-lg w-16 text-center"
                    />
                </div>
                <p className="text-3xl font-mono mt-2">{formatTime(timerTime)}</p>
                <div className="flex justify-center mt-4 space-x-4">
                    {!isTimerRunning ? (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStartTimer}
                            className="p-3 bg-green-500 text-white rounded-full"
                        >
                            Start Timer
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePauseTimer}
                            className="p-3 bg-yellow-500 text-white rounded-full"
                        >
                            Pause Timer
                        </motion.button>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetTimer}
                        className="p-3 bg-red-500 text-white rounded-full"
                    >
                        Reset Timer
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default StopwatchAndClock;
