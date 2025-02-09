import { motion } from "framer-motion";
import { FaStar, FaClock, FaBook } from "react-icons/fa";
import bookImage from '../assets/book.webp';

const LandingPage = ({ onGetStarted }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-5">
                <h1 className="text-2xl font-bold">📚 Study Scheduler</h1>
                <button
                    onClick={onGetStarted}
                    className="bg-white text-blue-600 px-4 py-2 rounded-md font-bold"
                >
                    Get Started
                </button>
            </nav>

            {/* Hero Section */}
            <section className="flex flex-col-reverse md:flex-row items-center justify-between px-10 mt-10">
                <div className="md:w-1/2 text-center md:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold leading-tight"
                    >
                        Organize Your Study Plan <br /> **Smartly & Efficiently!**
                    </motion.h1>
                    <p className="mt-4 text-lg">
                        Customize your study schedule based on subjects, interest, and time.
                        Track your progress and improve weak areas with AI-based recommendations.
                    </p>
                    <button
                        onClick={onGetStarted}
                        className="mt-5 px-6 py-3 bg-white text-blue-600 font-bold rounded-md shadow-lg hover:bg-gray-200 transition"
                    >
                        Start Scheduling
                    </button>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="md:w-1/2 flex justify-center"
                >
                    <img
                        src={bookImage}
                        // alt="Study Planner"
                        className=" rounded-lg w-70 shadow-lg"
                    />
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="mt-20 px-10">
                <h2 className="text-center text-3xl font-bold">Why Choose Our Scheduler?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-center">
                    <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white text-blue-600 rounded-lg shadow-md">
                        <FaStar className="text-4xl mx-auto text-yellow-400" />
                        <h3 className="text-xl font-bold mt-2">Custom Study Plan</h3>
                        <p>Set subjects, interest level, and syllabus to get a personalized plan.</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white text-blue-600 rounded-lg shadow-md">
                        <FaClock className="text-4xl mx-auto text-green-400" />
                        <h3 className="text-xl font-bold mt-2">Smart Time Management</h3>
                        <p>AI allocates more time to weaker subjects and adjusts accordingly.</p>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white text-blue-600 rounded-lg shadow-md">
                        <FaBook className="text-4xl mx-auto text-red-400" />
                        <h3 className="text-xl font-bold mt-2">Notes & Progress Tracking</h3>
                        <p>Save notes, track your study hours, and stay motivated!</p>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="mt-20 text-center">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold"
                >
                    Start Your Study Plan Today!
                </motion.h2>
                <button
                    onClick={onGetStarted}
                    className="mt-6 px-8 py-3 bg-white text-blue-600 font-bold rounded-md shadow-lg hover:bg-gray-200 transition"
                >
                    Get Started Now
                </button>
            </section>

            {/* Footer */}
            <footer className="mt-20 text-center p-5 bg-gray-900">
                <p className="text-gray-400">&copy; 2025 Study Scheduler. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
