import ElevatedButton from '@/components/button/ElevatedButton';
import OutlineButton from '@/components/button/OutlineButton';

type NotAvailableFormProps = {
    musicianName: string;
    onClose?: () => void;
};

export default function NotAvailableForm({
    musicianName,
    onClose,
}: NotAvailableFormProps) {
    return (
        <>
            <div></div>
            <div className="flex flex-col gap-4">
                <h1 className="text-lg mb-16">
                    <span className="font-bold">{musicianName}</span> has no
                    available dates
                </h1>
                <OutlineButton onClick={onClose}>Close</OutlineButton>
            </div>
            <div></div>
        </>
    );
}
