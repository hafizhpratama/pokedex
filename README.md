# Pokedex

## Overview

This is a Pokedex application built using React.js, TypeScript, and Vite. The application allows users to explore Pokémon information, including base stats, types, abilities, and detailed descriptions. It features a dynamic and engaging UI that makes it easy to search for and view Pokémon data.

## Features

- **Pokémon List**: Display a list of Pokémon with pagination and search functionality.
- **Pokémon Details**: View detailed information about each Pokémon, including base stats, abilities, and a description.
- **Responsive Design**: The application is designed to be responsive and looks great on both desktop and mobile devices.
- **Loading States**: Interactive loading spinners are used to enhance the user experience during data fetching.

## Technologies

- **React.js**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly-typed programming language that builds on JavaScript, providing static type checking.
- **Vite**: A modern build tool that provides fast development and build processes.

## Installation

To get started with the project, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/pokedex.git
   cd pokedex
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Start the Development Server:**

   ```bash
   npm run dev
   ```

4. **Open the Application:**

   Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- **Search for Pokémon**: Use the search bar to find Pokémon by name or ID.
- **View Details**: Click on a Pokémon to view detailed information in a modal.
- **Pagination**: Navigate through pages of Pokémon with pagination controls.

## Project Structure

- `src/` - Contains the source code for the application.
  - `components/` - Reusable React components.
  - `constants/` - Contains constant values like Pokémon type colors.
  - `services/` - Functions to interact with external APIs.
  - `styles/` - Tailwind CSS styles for the application.
  - `types/` - TypeScript type definitions.
- `public/` - Contains static assets.
- `index.html` - The main HTML file.
- `vite.config.ts` - Vite configuration file.

## Contributing

If you would like to contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them.
4. Push your branch to your forked repository.
5. Open a pull request to the main repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Hafizh Pratama** - [GitHub](https://github.com/hafizhpratama)

## Acknowledgements

- [PokéAPI](https://pokeapi.co/) for providing Pokémon data.
