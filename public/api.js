const API = {
    async getLastWorkout() {
        let res;
        try {
            res = await fetch("/api/workouts");
        } catch (err) {
            console.log(err)
        }
        let json = await res.json();
        json = json[json.length - 1]; // Get the last workout object
        let totalDuration = 0; // Initialise totalDuration value
        totalDuration = json.exercises.reduce((a, { duration }) => a + duration, 0); // Sum up exercises' durations
        json.totalDuration = totalDuration;
        return json;
    },
    async addExercise(data) {
        const id = location.search.split("=")[1];

        const res = await fetch("/api/workouts/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const json = await res.json();

        return json;
    },
    async createWorkout(data = {}) {
        const res = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        });

        const json = await res.json();

        return json;
    },

    async getWorkoutsInRange() {
        const res = await fetch(`/api/workouts/range`);
        const json = await res.json();

        return json;
    },
};