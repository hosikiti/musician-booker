type BookingCompletedDrawerProps = {
    enabled: boolean;
    onClose: () => void;
};

export default function BookingCompletedDrawer({
    enabled,
    onClose,
}: BookingCompletedDrawerProps) {
    return (
        <div className="drawer drawer-end">
            <input
                id="booking-completed-drawer"
                type="checkbox"
                checked={enabled}
                className="drawer-toggle"
                onClick={onClose}
            />
            <div className="drawer-side">
                <label
                    htmlFor="booking-completed-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
                    {/* Sidebar content here */}
                    <div className="py-8">
                        <h2 className="text-xl font-bold mb-4">All good!</h2>
                        <p>Your session was added to the list</p>
                    </div>
                    <button className="btn btn-outline" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
