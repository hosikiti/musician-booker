import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                brand: {
                    25: '#FDF7F4',
                    300: '#EDA892',
                },
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    ...require('daisyui/src/theming/themes')['light'],
                    primary: '#DE6139',
                    'primary-content': '#ffffff',
                    secondary: 'teal',
                    neutral: '#808080',
                    'base-100': '#F3F4F6',
                    'base-300': '#6B7280',
                    'base-content': '#374151',
                    'accent-content': '#131313',
                },
            },
        ],
    },
};
export default config;
