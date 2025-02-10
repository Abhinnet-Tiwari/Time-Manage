import React, { useState } from "react";
import axios from "axios";

const Chatbot = ({ darkMode }) => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setResponse("");

        try {
            const res = await axios.post("http://127.0.0.1:5000/ask",
                { message: input },
                { headers: { "Content-Type": "application/json" } } 
            );

            setResponse(res.data.response || "No response from AI.");
        } catch (error) {
            console.error("Error fetching response:", error);
            setResponse("Error getting response.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className={`flex flex-col mb-4 items-center p-4 w-full max-w-md mx-auto ${darkMode ? "text-white" : "text-black"}  shadow-lg rounded-lg`}>
            <h2 className="text-xl font-bold mb-2">Simple Chatbot</h2>

            <textarea
                className={`${darkMode ? "text-white" : "text-black"} w-full p-2 border rounded-lg `}
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <button
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleSend}
                disabled={loading}
            >
                {loading ? "Thinking..." : "Send"}
            </button>

            <div className="mt-4 p-3 w-full border rounded-lg">
                {response || "Response will appear here..."}
            </div>
        </div>
    );
};

export default Chatbot;
