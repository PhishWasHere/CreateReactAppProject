/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
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

