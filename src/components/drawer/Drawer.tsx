type DrawerProps = {
    children: React.ReactNode;
    id: string;
    enabled: boolean;
    onClose?: () => void;
};

export default function Drawer({
    children,
    id,
    enabled,
    onClose,
}: DrawerProps) {
    return (
        <div className="drawer drawer-end">
            <input
                id={id}
                type="checkbox"
                checked={enabled}
                className="drawer-toggle"
                onChange={() => {}}
            />
            <div className="drawer-side">
                <label
                    htmlFor={id}
                    aria-label="close sidebar"
                    className="drawer-overlay"
                    onClick={onClose}
                ></label>
                <div className="bg-white menu p-8 w-80 min-h-full text-base-content flex flex-col justify-between">
                    {/* Sidebar content here */}
                    {children}
                </div>
            </div>
        </div>
    );
}
