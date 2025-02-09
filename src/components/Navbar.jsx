
// import { useState } from "react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // v2 imports

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <nav className="p-4 bg-blue-500 text-white flex justify-between items-center relative">
//             <h1 className="text-lg font-bold">Study Scheduler</h1>
//             <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
//                 {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
//             </button>
//             <div className="hidden md:flex space-x-4">
//                 <ul className="flex space-x-4">
//                     <li className="p-2">Home</li>
//                     <li className="p-2">Subjects</li>
//                     <li className="p-2">Progress</li>
//                 </ul>
//             </div>
//             {isOpen && (
//                 <div className="absolute top-12 left-0 right-0 bg-white text-black p-4 rounded shadow-lg md:hidden">
//                     <ul>
//                         <li className="p-2">Home</li>
//                         <li className="p-2">Subjects</li>
//                         <li className="p-2">Progress</li>
//                     </ul>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;
