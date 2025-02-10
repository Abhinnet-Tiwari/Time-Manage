


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, RefreshCw } from "lucide-react";

// Skeleton Loader for Joke and Quote sections
const SkeletonLoader = () => (
    <div className="p-4 bg-gray-200 rounded-lg shadow w-full h-24 animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
);

const JokesAndQuotes = ({ darkMode }) => {
    const [joke, setJoke] = useState(null);
    const [quote, setQuote] = useState(null);
    const [loadingJoke, setLoadingJoke] = useState(true);
    const [loadingQuote, setLoadingQuote] = useState(true);
    const [regenerating, setRegenerating] = useState(false);

    // Fetch Joke
    const fetchJoke = async () => {
        try {
            const res = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
            setJoke(res.data.joke);
            setLoadingJoke(false);
        } catch (error) {
            console.error("Error fetching joke:", error);
            setLoadingJoke(false);
        }
    };

    // Fetch Motivational Quote
    const fetchQuote = async () => {
        try {
            const res = await axios.get("https://api.quotable.io/random?tags=motivational");
            setQuote({ text: res.data.content, author: res.data.author });
            setLoadingQuote(false);
        } catch (error) {
            console.error("Error fetching quote:", error);
            setLoadingQuote(false);
        }
    };

    // Fetch both on load
    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([fetchJoke(), fetchQuote()]);
        };

        fetchData();
    }, []);

    // Regenerate Content
    const regenerateContent = async () => {
        setRegenerating(true);
        setLoadingJoke(true);
        setLoadingQuote(true);
        await Promise.all([fetchJoke(), fetchQuote()]);
        setRegenerating(false);
    };

    return (
        <div className={`${darkMode ? "text-white" : "text-black bg-white"} w-full m-3 mx-auto p-5 shadow-lg rounded-2xl border`}>
            <h2 className={`${darkMode ? "text-white" : "text-black"} text-lg font-bold text-center text-gray-800`}>✨ Daily Dose of Fun & Motivation ✨</h2>

            <div className="mt-4 space-y-4">
                {/* Joke Section */}
                <div className="p-4 bg-blue-100 rounded-lg shadow">
                    <h3 className="font-semibold text-blue-700">😂 Joke of the Moment</h3>
                    {loadingJoke ? (
                        <SkeletonLoader />
                    ) : (
                        <p className="text-gray-700">{joke || "No joke available"}</p>
                    )}
                </div>

                {/* Quote Section */}
                <div className="p-4 bg-yellow-100 rounded-lg shadow">
                    <h3 className="font-semibold text-yellow-700">💡 Motivational Quote</h3>
                    {loadingQuote ? (
                        <SkeletonLoader />
                    ) : (
                        <>
                            <p className="text-gray-700">"{quote?.text || "No quote available"}"</p>
                            <p className="text-sm text-gray-500 text-right">— {quote?.author || "Unknown"}</p>
                        </>
                    )}
                </div>
            </div>

            {/* Regenerate Button */}
            <button
                className="flex items-center justify-center gap-2 mt-4 w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                onClick={regenerateContent}
                disabled={regenerating}
            >
                {regenerating ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Regenerating...
                    </>
                ) : (
                    <>
                        <RefreshCw className="w-4 h-4" />
                        Regenerate
                    </>
                )}
            </button>
        </div>
    );
};

export default JokesAndQuotes;
