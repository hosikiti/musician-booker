type BookingFormDrawerProps = {
    enabled: boolean;
    onClose?: () => void;
};

export default function BookingFormDrawer({
    enabled,
    onClose,
}: BookingFormDrawerProps) {
    return (
        <div className="drawer drawer-end">
            <input
                id="booking-form-drawer"
                type="checkbox"
                checked={enabled}
                className="drawer-toggle"
            />
            <div className="drawer-side">
                <label
                    htmlFor="booking-form-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                    onClick={onClose}
                ></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <div className=" p-8 flex flex-col gap-4">
                        <div>
                            <span>What&apos;s your name?</span>
                        </div>
                        <button className="btn btn-primary">
                            Book Session
                        </button>
                    </div>
                </ul>
            </div>
        </div>
    );
}
