import { Musician } from '../api/musicians/route';
import Image from 'next/image';

type MusicianCardProps = {
    musician: Musician;
    onClick?: () => void;
};

export default function MusicianCard({ musician, onClick }: MusicianCardProps) {
    return (
        <div
            className="p-8 bg-white shadow-md rounded-lg flex flex-col items-cente cursor-pointer"
            onClick={onClick}
        >
            <Image
                src={musician.avatar}
                alt="musician"
                width={100}
                height={100}
            ></Image>
            <span className="text-lg">{musician.name}</span>
            <span className="">{musician.services[0].name}</span>
        </div>
    );
}
