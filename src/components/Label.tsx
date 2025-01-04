
interface Props {
    id: string;
    text: string;
    emoji: string;
    showLegend: boolean;
}

export const Label = ({ id, text, emoji, showLegend }: Props) => {

    return (
        <label
            htmlFor={id}
            className={"text-2xl text-right cursor-pointer" + (showLegend ? " w-24" : "  ")}
            title={text}
        >
            {showLegend ? text : emoji}
        </label>
    );
};
