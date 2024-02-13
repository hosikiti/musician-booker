import Image from 'next/image';

type AvatarProps = {
    src: string;
    alt: string;
    size?: 'sm' | 'md' | 'lg';
};

const sizePixels = {
    sm: 32,
    md: 32 * 2,
    lg: 32 * 3,
};

export default function Avatar({ src, alt, size = 'sm' }: AvatarProps) {
    return (
        <div>
            <div className="avatar">
                <div className={`rounded-full w-${sizePixels[size] / 4}`}>
                    <Image
                        src={src}
                        alt={alt}
                        width={sizePixels[size]}
                        height={sizePixels[size]}
                    />
                </div>
            </div>{' '}
        </div>
    );
}
