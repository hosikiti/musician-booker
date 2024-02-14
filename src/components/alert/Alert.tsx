type AlertProps = {
    children: React.ReactNode;
    type?: 'success' | 'error';
};

const baseClasses = 'p-4 border rounded-lg';
const typeClasses = {
    success: 'border-brand-300 bg-brand-25',
    error: 'border-red-300 bg-red-50',
};

export default function Alert({ children, type = 'success' }: AlertProps) {
    return (
        <div className={`${baseClasses} ${typeClasses[type]}`}>{children}</div>
    );
}
