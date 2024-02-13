import { ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {};

export default function ElevatedButton(props: ButtonProps) {
    return (
        <button
            {...props}
            className={`${props.className} btn w-full max-w-xs shadow-lg`}
        >
            {props.children}
        </button>
    );
}
