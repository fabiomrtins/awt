module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'delete-icon': "./src/icons/crud/delete.svg"
      },
      backgroundColor: {
        "not-so-grey": "#F8F8F8",
        "theme": "#5AAD9F"
      },
      borderColor: {
        "theme": "#5AAD9F"  
      },
      textColor: {
        "theme": "#5AAD9F"
      }
    },
  },
  plugins: [],
}
