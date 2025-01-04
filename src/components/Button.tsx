interface Props {
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button = ({ children, onClick }: Props) => {
    return (
        <button onClick={onClick} className="py-2 px-4 bg-neutral-600 text-white rounded hover:bg-neutral-700 hover:outline hover:outline-1 hover:outline-neutral-400">
            {children}
        </button>
    );
}