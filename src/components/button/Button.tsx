import { ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {};

export default function Button(props: ButtonProps) {
    return (
        <button
            {...props}
            className="btn btn-primary w-full max-w-xs shadow-lg"
        >
            {props.children}
        </button>
    );
}
