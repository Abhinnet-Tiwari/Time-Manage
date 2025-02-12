import React, { useState, useEffect, useRef } from "react";
import "./Game.css";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaRedo, FaTimes } from "react-icons/fa";

import backgroundMusicFile from "../assets/destination-01.mp3";
import clickSoundFile from "../assets/button-7.wav";

const Game = ({ stopGame, darkMode }) => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [ballSpeed, setBallSpeed] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);
    const [ball, setBall] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const gameAreaRef = useRef(null);
    const backgroundMusic = useRef(new Audio(backgroundMusicFile));
    const clickSound = useRef(new Audio(clickSoundFile));

    useEffect(() => {
        let timeInterval;
        let ballInterval;

        if (isRunning) {
            backgroundMusic.current.loop = true;
            backgroundMusic.current.play();
            timeInterval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            ballInterval = setInterval(() => {
                setBall(getRandomPosition());
            }, ballSpeed);
        } else {
            backgroundMusic.current.pause();
        }

        return () => {
            clearInterval(timeInterval);
            clearInterval(ballInterval);
            backgroundMusic.current.pause();
        };
    }, [isRunning, ballSpeed]);

    const getRandomPosition = () => {
        if (!gameAreaRef.current) return { x: 0, y: 0 };
        const gameArea = gameAreaRef.current;
        const gameAreaWidth = gameArea.offsetWidth;
        const gameAreaHeight = gameArea.offsetHeight;

        return {
            x: Math.random() * (gameAreaWidth - 50),
            y: Math.random() * (gameAreaHeight - 50),
        };
    };

    const handleBallClick = () => {
        clickSound.current.play();
        setScore((prev) => {
            const newScore = prev + 1;
            if (newScore > highScore) setHighScore(newScore);
            return newScore;
        });
        setTimeLeft((prev) => prev + 1);
        setBall(null);
        if (ballSpeed > 500) setBallSpeed((prev) => prev - 50);
    };

    const startGame = () => {
        setIsRunning(true);
        setGameOver(false);
    };

    const pauseGame = () => {
        setIsRunning(false);
    };

    const resumeGame = () => {
        setIsRunning(false);
        setScore(0);
        setTimeLeft(20);
        setBallSpeed(2000);
    };

    const endGame = () => {
        setIsRunning(false);
        setGameOver(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`game-container-overlay ${darkMode ? "dark-mode" : ""}`}
        >
            <div className="game-header">
                <h1>🎯 Score: {score}</h1>
                <h2>🏆 High Score: {highScore}</h2>
                <h2>⏳ Time Left: {timeLeft}s</h2>
            </div>

            {gameOver && (
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="game-over"
                >
                    <p>Game Over! Your score is {score}.</p>
                </motion.div>
            )}

            <div className="controls">
                <button onClick={startGame} disabled={isRunning || gameOver} className="btn start"><FaPlay /></button>
                <button onClick={pauseGame} disabled={!isRunning} className="btn pause"><FaPause /></button>
                <button onClick={resumeGame} disabled={isRunning || gameOver} className="btn resume"><FaRedo /></button>
                <button onClick={stopGame} className="btn stop"><FaTimes /></button>
            </div>

            <div id="game-area" ref={gameAreaRef} className="game-area">
                {ball && (
                    <motion.div
                        className="ball"
                        style={{ left: ball.x, top: ball.y }}
                        onClick={handleBallClick}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                    ></motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Game;
