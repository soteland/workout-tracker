
import { useState, useEffect } from 'react'
import supabase from './hooks/supabase'
import { Tables } from './types/supabase'
import { Button } from './components/Button';
import { WorkoutStatsTable } from './components/WorkoutStatsTable';
import { WorkoutsTable } from './components/WorkoutsTable';
import { WorkoutLogging } from './components/WorkoutLogging';
import { WorkoutUpdate } from './components/WorkoutUpdate';
import ReactConfetti from 'react-confetti';

function Tracker() {
    const [workouts, setWorkouts] = useState<Tables<'workouts'>[]>([])
    const [showLegend, setShowLegend] = useState(false);
    const [idForUpdate, setIdForUpdate] = useState(0);

    const [saveSuccess, setSaveSuccess] = useState(false)

    const [viewportSize, setViewportSize] = useState([window.innerWidth, document.documentElement.clientHeight])

    useEffect(() => {
        if (saveSuccess) {
            setTimeout(() => {
                setSaveSuccess(false)
            }, 5000)
        }
    }, [saveSuccess])

    async function getWorkouts() {
        const { data: workouts } = await supabase.from('workouts').select()

        if (!workouts) {
            return
        }

        if (workouts.length > 0) {
            setWorkouts(workouts)
        }
    }

    useEffect(() => {
        getWorkouts()
        setViewportSize([window.innerWidth, document.documentElement.clientHeight])
    }, [])

    return (
        <div>
            {saveSuccess &&
                <ReactConfetti
                    width={viewportSize[0]}
                    height={viewportSize[1]}
                    recycle={false} />
            }

            {idForUpdate != 0 &&
                <WorkoutUpdate
                    getWorkouts={getWorkouts}
                    showLegend={showLegend}
                    setShowLegend={setShowLegend}
                    idForUpdate={idForUpdate}
                    setIdForUpdate={setIdForUpdate}
                    setSaveSuccess={setSaveSuccess} />
            }

            {idForUpdate == 0 &&
                <WorkoutLogging
                    getWorkouts={getWorkouts}
                    showLegend={showLegend}
                    setShowLegend={setShowLegend}
                    setSaveSuccess={setSaveSuccess} />
            }

            <div className='flex flex-col items-center justify-center my-4 mx-auto'>

                <WorkoutStatsTable
                    workouts={workouts} />

                <WorkoutsTable
                    workouts={workouts}
                    getWorkouts={getWorkouts}
                    showLegend={showLegend}
                    setIdForUpdate={setIdForUpdate} />

                <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>

                <div className='mt-8 mb-4'>
                    <footer className='text-neutral-500 text-center'>
                        &copy; {new Date().getFullYear()} Workout Tracker by <a href="https://github.com/soteland">soteland</a> <br></br>
                        <a href="https://github.com/soteland/workout-tracker">github.com/soteland/workout-tracker</a>
                    </footer>
                </div>
            </div>
        </div >
    )
}
export default Tracker
