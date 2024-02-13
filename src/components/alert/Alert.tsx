type AlertProps = {
    children: React.ReactNode;
};

export default function Alert({ children }: AlertProps) {
    return (
        <div className="p-4 border border-brand-300 rounded-lg bg-brand-25">
            {children}
        </div>
    );
}
