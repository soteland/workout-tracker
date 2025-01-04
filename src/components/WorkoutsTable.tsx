import { Button } from "./Button";
import supabase from "../hooks/supabase";

interface Props {
    workouts: any[];
    getWorkouts: () => void;
    showLegend: boolean;
    setIdForUpdate: (id: number) => void;
}

export const WorkoutsTable = ({ workouts, getWorkouts, showLegend, setIdForUpdate }: Props) => {

    return (
        <div className='mt-8 mb-8 overflow-x-scroll w-full'>
            <h2 className='text-neutral-200 text-2xl mb-4 text-center'>Workout list</h2>
            <table className='bg-neutral-700 text-neutral-200 rounded-md mb-4'>
                <thead>
                    <tr className='bg-neutral-800'>
                        <th className='px-4 py-2'>Date</th>
                        <th className='px-4 py-2'>👐</th>
                        <th className='px-4 py-2'>💪</th>
                        <th className='px-4 py-2'>🫃</th>
                        <th className='px-4 py-2'>🧎‍♂️</th>
                        <th className='px-4 py-2'>🚴</th>
                        <th className='px-4 py-2'>🏋️</th>
                        <th className='px-2 py-2'>🗙</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map((workout) => (
                        <tr key={workout.id}>
                            <td className='px-4 py-2'>{workout.date.substring(0, 10)}</td>
                            <td className='px-4 py-2'>{workout.pushups}</td>
                            <td className='px-4 py-2'>{workout.pullups}</td>
                            <td className='px-4 py-2'>{workout.situps}</td>
                            <td className='px-4 py-2'>{workout.burpees ? "✅" : ""}</td>
                            <td className='px-4 py-2'>{workout.biking ? "✅" : ""}</td>
                            <td className='px-4 py-2'>{workout.weightlifting}</td>
                            <td className='px-4 py-2'>
                                <Button onClick={() => {
                                    showLegend ? console.log(workout) : console.log("👀")
                                    console.log(workout)
                                    setIdForUpdate(workout.id)
                                }}>
                                    Rediger
                                </Button>
                            </td>
                            <td className='px-4 py-2'>
                                <Button onClick={async () => {
                                    await supabase.from('workouts').delete().eq('id', workout.id).then(() => {
                                        getWorkouts()
                                    })
                                }}
                                >{showLegend ? "Slett" : "🗙"}</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
