import Countdown from "react-countdown";

const StudyTimer = ({darkMode}) => {
    return (
        <div className={`${darkMode ? "text-white bg-gray-400" : "text-black bg-white"} p-6 bg-blue-100 rounded-lg shadow-md`}>
            <h2 className="text-xl font-bold mb-2">Study Timer (Pomodoro)</h2>
            <Countdown date={Date.now() + 25 * 60 * 1000} />
            <p>Take a 5-minute break after each session!</p>
        </div>
    );
};

export default StudyTimer;
