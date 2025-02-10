import React, { useState, useEffect, useRef } from "react";
import "./Game.css"
// Adding background music
const backgroundMusic = new Audio("../assets/destination-01.mp3");
backgroundMusic.loop = true;

// Adding click sound
const clickSound = new Audio("../assets/button.mp3");

const Game = ({ stopGame }) => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [ballSpeed, setBallSpeed] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);
    const [ball, setBall] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const gameAreaRef = useRef(null);

    useEffect(() => {
        let timeInterval;
        let ballInterval;

        if (isRunning) {
            backgroundMusic.play();
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
            backgroundMusic.pause();
        }

        return () => {
            clearInterval(timeInterval);
            clearInterval(ballInterval);
            backgroundMusic.pause();
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
        clickSound.play();

        setScore((prev) => {
            const newScore = prev + 1;
            if (newScore > highScore) setHighScore(newScore);
            return newScore;
        });
        setTimeLeft((prev) => prev + 3);
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
        setIsRunning(true);
    };

    const endGame = () => {
        setIsRunning(false);
        setGameOver(true);
    };

    return (
        <div className="game-container-overlay">
            <h1 className="score">Score: {score}</h1>
            <h2 className="high-score">High Score: {highScore}</h2>
            <h2 className="time-left">Time Left: {timeLeft}s</h2>
            {gameOver && <div className="game-over">Game Over! Your score is {score}.</div>}
            <div className="controls">
                <button onClick={startGame} disabled={isRunning || gameOver}>Start</button>
                <button onClick={pauseGame} disabled={!isRunning}>Pause</button>
                <button onClick={resumeGame} disabled={isRunning || gameOver}>Resume</button>
                <button onClick={stopGame}>Stop</button>
            </div>
            <div id="game-area" ref={gameAreaRef}>
                {ball && (
                    <div
                        className="ball"
                        style={{ left: ball.x, top: ball.y }}
                        onClick={handleBallClick}
                    ></div>
                )}
            </div>
        </div>
    );
};

export default Game;
