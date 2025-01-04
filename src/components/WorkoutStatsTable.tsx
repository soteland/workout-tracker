import { useEffect, useState } from "react";

interface Props {
    workouts: any[];
}

export const WorkoutStatsTable = ({ workouts }: Props) => {

    const [workoutStat, setWorkoutStat] = useState({ pushups: 0, pullups: 0, situps: 0, burpees: 0, biking: 0, weightlifting: 0 })

    useEffect(() => {
        const stats = workouts.reduce((acc, workout) => {
            return {
                pushups: acc.pushups + (workout.pushups ?? 0),
                pullups: acc.pullups + (workout.pullups ?? 0),
                situps: acc.situps + (workout.situps ?? 0),
                burpees: acc.burpees + (workout.burpees ?? 0),
                biking: acc.biking + (workout.biking ? 1 : 0),
                weightlifting: acc.weightlifting + (workout.weightlifting ? 1 : 0),
            }
        }, { pushups: 0, pullups: 0, situps: 0, burpees: 0, biking: 0, weightlifting: 0 })
        setWorkoutStat(stats)
    }, [workouts])


    return (
        <div className='mt-8'>
            <h2 className='text-neutral-200 text-2xl mb-4 text-center'>Workout Stats</h2>
            <table className='bg-neutral-700 text-neutral-200 rounded mb-4'>
                <thead>
                    <tr className='bg-neutral-800'>
                        <th className='px-4 py-2'>👐</th>
                        <th className='px-4 py-2'>💪</th>
                        <th className='px-4 py-2'>🫃</th>
                        <th className='px-4 py-2'>🧎‍♂️</th>
                        <th className='px-4 py-2'>🚴</th>
                        <th className='px-4 py-2'>🏋️</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='px-4 py-2'>{workoutStat.pushups}</td>
                        <td className='px-4 py-2'>{workoutStat.pullups}</td>
                        <td className='px-4 py-2'>{workoutStat.situps}</td>
                        <td className='px-4 py-2'>{workoutStat.burpees}</td>
                        <td className='px-4 py-2'>{workoutStat.biking}</td>
                        <td className='px-4 py-2'>{workoutStat.weightlifting}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
