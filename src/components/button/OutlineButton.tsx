import { ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {};

export default function OutlineButton(props: ButtonProps) {
    return (
        <button
            {...props}
            className={`btn btn-outline btn-neutral w-full max-w-xs ${props.className}`}
        >
            {props.children}
        </button>
    );
}
