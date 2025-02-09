import { FaPlus } from "react-icons/fa";

const FloatingButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg"
        >
            <FaPlus />
        </button>
    );
};

export default FloatingButton;
