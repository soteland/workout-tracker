import { Button } from "./Button";
import supabase from "../hooks/supabase";
import { Label } from "./Label";
import { useState } from "react";

interface Props {
    setShowLegend: (showLegend: boolean) => void;
    getWorkouts: () => void;
    showLegend: boolean;
    setSaveSuccess: (saveSuccess: boolean) => void;
}

export const WorkoutLogging = ({ setShowLegend, getWorkouts, showLegend, setSaveSuccess }: Props) => {

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
        else {
            setSaveSuccess(true);
            getWorkouts()
        };
    };

    return (
        <div className='flex flex-col items-center justify-center 
        border bg-neutral-800 border-neutral-700 my-4 mx-4 rounded-lg shadow-lg p-4 pb-8 pt-6 text-neutral-100'>
            <h1 className='text-neutral-200 text-4xl mb-8 mt-2'>Workout Tracker
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
                <Button onClick={() => setPushups(pushups + 5)}>+5</Button>
                <Button onClick={() => setPushups(pushups + 10)}>+10</Button>
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
                <Button onClick={() => setPullups(pullups + 5)}>+5</Button>
                <Button onClick={() => setPullups(pullups + 10)}>+10</Button>
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
                <Button onClick={() => setSitups(situps + 5)}>+5</Button>
                <Button onClick={() => setSitups(situps + 10)}>+10</Button>
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
                <Button onClick={() => setBurpees(burpees + 5)}>+5</Button>
                <Button onClick={() => setBurpees(burpees + 10)}>+10</Button>
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

            <Button onClick={() => logWorkout()}>
                Log Workout
            </Button>

        </div >
    );
};
