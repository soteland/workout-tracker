
import { useState, useEffect } from 'react'
import supabase from './hooks/supabase'
import { Tables } from './types/supabase'
import { Button } from './components/Button';
import { Label } from './components/Label';

function Tracker() {
    const [showLegend, setShowLegend] = useState(false);
    const [workouts, setWorkouts] = useState<Tables<'workouts'>[]>([])
    const [pushups, setPushups] = useState(0);
    const [pullups, setPullups] = useState(0);
    const [burpees, setBurpees] = useState(0);
    const [situps, setSitups] = useState(0);
    const [biking, setBiking] = useState(false);
    const [weightlifting, setWeightlifting] = useState(false);

    const logWorkout = async () => {
        const { error } = await supabase.from("workouts").insert({
            date: new Date().toISOString(),
            pushups,
            pullups,
            situps,
            burpees,
            biking,
            weightlifting,
        });
        if (error) alert(error.message);
        else getTodos();
    };

    async function getTodos() {
        const { data: workouts } = await supabase.from('workouts').select()

        if (!workouts) {
            return
        }

        if (workouts.length > 0) {
            setWorkouts(workouts)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

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
        <div>
            <div className='flex flex-col items-center justify-center 
        border bg-neutral-900 border-neutral-700 my-4 mx-4 rounded-lg shadow-lg p-4 pb-8 pt-6 text-neutral-100'>
                <h1 className='text-neutral-200 text-4xl mb-4'>Workout Tracker
                    <span className='cursor-pointer' onClick={() => setShowLegend(!showLegend)}>{showLegend ? "🙂" : "😉"}</span>
                </h1>
                <div className='flex gap-2 mb-4 '>
                    <Label id='pushups' text='Pushups' emoji='👐' showLegend={showLegend} />
                    <input
                        id='pushups'
                        type="number"
                        value={pushups}
                        onChange={(e) => setPushups(parseInt(e.target.value))}
                        className="ml-2 p-1 w-12 border rounded bg-neutral-800 border-neutral-600"
                    />
                    <Button onClick={() => setPushups(0)}>x</Button>
                    <Button onClick={() => setPushups(10)}>10</Button>
                    <Button onClick={() => setPushups(15)}>15</Button>
                    <Button onClick={() => setPushups(20)}>20</Button>
                </div>
                <div className='flex gap-2 mb-4'>
                    <Label id='pullups' text='Pullups' emoji='💪' showLegend={showLegend} />
                    <input
                        id='pullups'
                        type="number"
                        value={pullups}
                        onChange={(e) => setPullups(parseInt(e.target.value))}
                        className="ml-2 p-1  w-12 border rounded bg-neutral-800 border-neutral-600"
                    />
                    <Button onClick={() => setPullups(0)}>x</Button>
                    <Button onClick={() => setPullups(10)}>10</Button>
                    <Button onClick={() => setPullups(15)}>15</Button>
                    <Button onClick={() => setPullups(20)}>20</Button>
                </div>
                <div className='flex gap-2 mb-4'>
                    <Label id='sitpus' text='Situps' emoji='🫃' showLegend={showLegend} />
                    <input
                        id='situps'
                        type="number"
                        value={situps}
                        onChange={(e) => setSitups(parseInt(e.target.value))}
                        className="ml-2 p-1  w-12 border rounded bg-neutral-800 border-neutral-600"
                    />
                    <Button onClick={() => setSitups(0)}>x</Button>
                    <Button onClick={() => setSitups(10)}>10</Button>
                    <Button onClick={() => setSitups(15)}>15</Button>
                    <Button onClick={() => setSitups(20)}>20</Button>
                </div>
                <div className='flex gap-2 mb-4'>
                    <Label id='burpees' text='Burpees' emoji='🧎‍♂️' showLegend={showLegend} />
                    <input
                        id='burpees'
                        type="number"
                        value={burpees}
                        onChange={(e) => setBurpees(parseInt(e.target.value))}
                        className="ml-2 p-1  w-12 border rounded bg-neutral-800 border-neutral-600"
                    />
                    <Button onClick={() => setBurpees(0)}>x</Button>
                    <Button onClick={() => setBurpees(10)}>10</Button>
                    <Button onClick={() => setBurpees(15)}>15</Button>
                    <Button onClick={() => setBurpees(20)}>20</Button>
                </div>
                <div className='flex gap-2 mb-4 items-center' title='Biking'>
                    <Label id='biking' text='Biking' emoji='🚴' showLegend={showLegend} />
                    <input
                        id='biking'
                        type="checkbox"
                        checked={biking}
                        onChange={() => setBiking(!biking)}
                        className="ml-2 p-1 border rounded cursor-pointer size-4"
                    />
                </div>
                <div className='flex gap-2 mb-4 items-center' title="Weightlifting">
                    <Label id='weightlifting' text='Weightlift' emoji='🏋️' showLegend={showLegend} />
                    <input
                        id='weightlifting'
                        type="checkbox"
                        checked={weightlifting}
                        onChange={() => setWeightlifting(!weightlifting)}
                        className="ml-2 p-1 border rounded cursor-pointer size-4"
                    />
                </div>

                <Button
                    onClick={() => logWorkout()}
                >
                    Log Workout
                </Button>

            </div >

            <div className='flex flex-col items-center justify-center 
         my-4 mx-auto'>
                <div className='mt-8'>
                    <h2 className='text-neutral-200 text-2xl mb-4 text-center'>Workout list</h2>
                    <table className='bg-neutral-700 text-neutral-200 rounded-md mb-4'>
                        <thead>
                            <tr className='bg-neutral-800'>
                                <th className='px-4 py-2'>Date</th>
                                <th className='px-4 py-2'>
                                    👐
                                </th>
                                <th className='px-4 py-2'>💪</th>
                                <th className='px-4 py-2'>🫃</th>
                                <th className='px-4 py-2'>🧎‍♂️</th>
                                <th className='px-4 py-2'>🚴</th>
                                <th className='px-4 py-2'>🏋️</th>
                                <th className='px-4 py-2'>🗙</th>
                            </tr>
                        </thead>
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
                                    <Button onClick={async () => {
                                        await supabase.from('workouts').delete().eq('id', workout.id).then(() => {
                                            getTodos()
                                        })
                                    }}
                                    >{showLegend ? "Slett" : "🗙"}</Button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>

                <div className='mt-8 mb-8'>
                    <h2 className='text-neutral-200 text-2xl mb-4 text-center'>Workout Stats</h2>
                    <table className='bg-neutral-700 text-neutral-200 rounded-md mb-4'>
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
                        <tr>
                            <td className='px-4 py-2'>{workoutStat.pushups}</td>
                            <td className='px-4 py-2'>{workoutStat.pullups}</td>
                            <td className='px-4 py-2'>{workoutStat.situps}</td>
                            <td className='px-4 py-2'>{workoutStat.burpees}</td>
                            <td className='px-4 py-2'>{workoutStat.biking}</td>
                            <td className='px-4 py-2'>{workoutStat.weightlifting}</td>
                        </tr>
                    </table>
                </div>

                <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
            </div>
        </div>
    )
}
export default Tracker
