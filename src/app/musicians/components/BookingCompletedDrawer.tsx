import OutlineButton from '@/components/button/OutlineButton';
import Drawer from '@/components/drawer/Drawer';

type BookingCompletedDrawerProps = {
    enabled: boolean;
    onClose: () => void;
};

export default function BookingCompletedDrawer({
    enabled,
    onClose,
}: BookingCompletedDrawerProps) {
    return (
        <Drawer
            id="booking-completed-drawer"
            enabled={enabled}
            onClose={onClose}
        >
            <div className="py-8">
                <h2 className="text-xl font-bold mb-4">All good!</h2>
                <p>Your session was added to the list</p>
            </div>
            <OutlineButton onClick={onClose}>Close</OutlineButton>
        </Drawer>
    );
}
