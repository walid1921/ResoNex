module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        moveInLeft: "moveInLeft 1s ease-out",
        moveInBottom: "moveInBottom 1s ease-out",
        moveInRight: "moveInRight 1s ease-out",
        moveInTop: "moveInTop 0.3s ease-out",
        lightInfinite: "lightInfinite 1.5s linear infinite",
      },
      keyframes: {
        moveInLeft: {
          "0%": {
            opacity: 0,
            transform: "translateX(-5rem)",
          },
          "80%": {
            transform: "translateX(1rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        moveInBottom: {
          "0%": {
            opacity: 0,
            transform: "translateY(3rem)",
          },
          "80%": {
            transform: "translateY(-0.5rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(0)",
          },
        },
        moveInTop: {
          "0%": {
            opacity: 0,
            transform: "translateY(-1rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(0)",
          },
        },
        moveInRight: {
          "0%": {
            opacity: 0,
            transform: "translateX(5rem)",
          },
          "80%": {
            transform: "translateX(-1rem)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(0)",
          },
        },
        lightInfinite: {
          "0%, 20%, 50%, 80%, 100%": {
            opacity: 0.2,
          },
          "40%": {
            opacity: 1,
          },
        },
      },
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        "hero-pattern": "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
      },
    },
  },
  plugins: [],
};
