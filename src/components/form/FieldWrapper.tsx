type FieldWrapperProps = {
    label: string;
    children: React.ReactNode;
    errorMessage?: string;
};

export const FieldWrapper = ({
    label,
    children,
    errorMessage,
}: FieldWrapperProps) => (
    <div className="mb-4 flex flex-col gap-2">
        <label className="text-lg font-bold">{label}</label>
        {children}
        <div role="alert" className="text-sm text-error">
            {errorMessage}
        </div>
    </div>
);
