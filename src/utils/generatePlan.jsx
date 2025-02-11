

export const generateAIStudyPlan = (subjects, dailyStudyTime, userPreferences = {}) => {
    if (!subjects || subjects.length === 0) {
        console.error("Subjects array is undefined or empty!");
        return [];
    }

    const totalStars = subjects.reduce((acc, sub) => acc + (6 - sub.stars), 0);
    let schedule = {};

    const adjustForUserPreferences = (subjectName, weight) => {
        if (userPreferences[subjectName]) {
            const { focusLevel, timePreference, learningStyle } = userPreferences[subjectName];
            if (focusLevel > 0) {
                weight += focusLevel; 
            }
            if (timePreference) {
                weight = timePreference; 
            }
            if (learningStyle) {
                if (learningStyle === "video") weight += 1;
                if (learningStyle === "interactive") weight += 0.5;
            }
        }
        return weight;
    };

    const adjustForDifficulty = (subject, weight) => {
        if (subject.difficultyLevel === "high") {
            weight *= 1.5; 
        } else if (subject.difficultyLevel === "low") {
            weight *= 0.8; 
        }
        return weight;
    };

    const chunkTime = (totalTimeInMinutes) => {
        const chunks = [];
        let remainingTime = totalTimeInMinutes;

        while (remainingTime > 0) {
            const studyChunk = remainingTime >= 45 ? 45 : remainingTime;
            const breakChunk = 15;
            chunks.push({ study: studyChunk, break: breakChunk });
            remainingTime -= (studyChunk + breakChunk);
        }
        return chunks;
    };

    subjects.forEach((subject) => {
        let weight = 6 - subject.stars;
        weight = adjustForUserPreferences(subject.name, weight);
        weight = adjustForDifficulty(subject, weight);

        const timeAllocation = ((weight / totalStars) * dailyStudyTime).toFixed(2);
        const timeInMinutes = Math.floor(timeAllocation * 60); 

        const studyChunks = chunkTime(timeInMinutes);

        const syllabus = subject.syllabus && Array.isArray(subject.syllabus) && subject.syllabus.length > 0
            ? subject.syllabus
            : ["General Study", "Practice Problems", "Theory Review"];

        schedule[subject.name] = {
            time: `${Math.floor(timeInMinutes / 60)} hrs ${Math.round(timeInMinutes % 60)} mins`,
            studyChunks,
            syllabus,
            priority: subject.stars,
            difficulty: subject.difficultyLevel || "medium", 
            suggestion: subject.stars > 3
                ? "Great! Keep it up!"
                : "Focus more on this subject for better results.",
        };
    });

    return schedule;
};
