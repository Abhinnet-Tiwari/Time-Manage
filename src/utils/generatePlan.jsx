

// // AI-powered study plan generation
// export const generateAIStudyPlan = (subjects, dailyStudyTime, userPreferences = {}) => {
//     // if (subjects.length === 0 || dailyStudyTime === 0) return {};
//     if (!subjects || subjects.length === 0) {
//         console.error("Subjects array is undefined or empty!");
//         return [];
//     }

//     const totalStars = subjects.reduce((acc, sub) => acc + (6 - sub.stars), 0);
//     let schedule = {};

//     const adjustForUserPreferences = (subjectName, weight) => {
//         if (userPreferences[subjectName]) {
//             const { focusLevel, timePreference } = userPreferences[subjectName];
//             if (focusLevel > 0) {
//                 weight += focusLevel; 
//             }
//             if (timePreference) {
//                 weight = timePreference;
//             }
//         }
//         return weight;
//     };

//     subjects.forEach((subject) => {
//         let weight = 6 - subject.stars;
//         weight = adjustForUserPreferences(subject.name, weight);

//         const timeAllocation = ((weight / totalStars) * dailyStudyTime).toFixed(2);
//         const hours = Math.floor(timeAllocation);
//         const minutes = Math.round((timeAllocation - hours) * 60);

//         const syllabus = subject.syllabus.length > 0
// ? subject.syllabus
//             : ["General Study", "Practice Problems", "Theory Review"];

//         schedule[subject.name] = {
//             time: `${hours} hrs ${minutes} mins`,
//             syllabus,
//             priority: subject.stars, 
//         };
//     });

//     return schedule;
// };

export const generateAIStudyPlan = (subjects, dailyStudyTime, userPreferences = {}) => {
    if (!subjects || subjects.length === 0) {
        console.error("Subjects array is undefined or empty!");
        return [];
    }

    const totalStars = subjects.reduce((acc, sub) => acc + (6 - sub.stars), 0);
    let schedule = {};

    const adjustForUserPreferences = (subjectName, weight) => {
        if (userPreferences[subjectName]) {
            const { focusLevel, timePreference } = userPreferences[subjectName];
            if (focusLevel > 0) {
                weight += focusLevel;
            }
            if (timePreference) {
                weight = timePreference;
            }
        }
        return weight;
    };

    subjects.forEach((subject) => {
        let weight = 6 - subject.stars;
        weight = adjustForUserPreferences(subject.name, weight);

        const timeAllocation = ((weight / totalStars) * dailyStudyTime).toFixed(2);
        const hours = Math.floor(timeAllocation);
        const minutes = Math.round((timeAllocation - hours) * 60);

        // 🔹 Ensure `syllabus` exists before accessing `.length`
        const syllabus = subject.syllabus && Array.isArray(subject.syllabus) && subject.syllabus.length > 0
            ? subject.syllabus
            : ["General Study", "Practice Problems", "Theory Review"];

        schedule[subject.name] = {
            time: `${hours} hrs ${minutes} mins`,
            syllabus,
            priority: subject.stars,
        };
    });

    return schedule;
};
