
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
            className="text-2xl w-24 text-right cursor-pointer"
            title={text}
        >
            {showLegend ? text : emoji}
        </label>
    );
};
