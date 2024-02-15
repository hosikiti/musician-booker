import { Musician } from '@/types';
import Image from 'next/image';
import React from 'react';

type MusicianCardProps = {
    musician: Musician;
    onClick?: () => void;
};

export default function MusicianCard({ musician, onClick }: MusicianCardProps) {
    return (
        <div
            className="p-8 bg-white shadow-lg rounded-lg flex flex-col items-center cursor-pointer w-full md:w-[30%]"
            onClick={onClick}
        >
            <div className="avatar mb-4">
                <div className="w-[120px] mask mask-squircle">
                    <Image
                        src={musician.avatar}
                        alt="musician"
                        width={120}
                        height={120}
                    ></Image>
                </div>
            </div>
            <span className="text-lg font-bold">{musician.name}</span>
            <span className="text-primary text-sm">
                {musician.services[0].name}
            </span>
        </div>
    );
}

export const MemoMusicianCard = React.memo(MusicianCard, (prev, next) => {
    return prev.musician.id === next.musician.id;
});
