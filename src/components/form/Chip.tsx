import {
    FieldValues,
    UseFormRegister,
    UseFormRegisterReturn,
} from 'react-hook-form';

const selectedStyle = 'btn-primary';
const unselectedStyle = 'btn';

type ChipProps = {
    label: string;
    value: string;
    selected: boolean;
    registration: UseFormRegisterReturn;
};

export default function Chip({
    label,
    value,
    selected,
    registration,
}: ChipProps) {
    return (
        <label className={`btn ${selected ? selectedStyle : unselectedStyle}`}>
            {label}
            <input
                type="radio"
                className="hidden"
                value={value}
                {...registration}
            ></input>
        </label>
    );
}
