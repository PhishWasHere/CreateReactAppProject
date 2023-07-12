/** @type {import('tailwindcss').Config} */
module.exports = {
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
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      { 
        'mytheme': {
          "primary": "#fcbdbe",     
          "secondary": "#072784",         
          "accent": "#0c2668",    
          "neutral": "#3c2442",    
          "base-100": "#2f2c3a",    
          "info": "#4190c8",    
          "success": "#3cd3af",    
          "warning": "#ecc251",    
          "error": "#fa3314",
        },  
      },
    ],
  },
};

