module.exports = {
    theme: {
      extend: {
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
        animation: {
          fadeInUp: 'fadeInUp 1s ease-out forwards',
        },
      },
    },
    // ...
  };