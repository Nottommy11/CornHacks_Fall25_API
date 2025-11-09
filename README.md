# TerraFlo Backend API

This repository contains the backend API for the TerraFlo project, developed for the CornHacks Fall 2025 hackathon.  
It serves as the data and authentication layer for the SvelteKit frontend dashboard, managing user data and serving sensor-style information.

## Overview

The TerraFlo Backend provides endpoints and logic to support the hydroponics monitoring dashboard by:
- Handling user login and registration  
- Serving simulated sensor/environmental data  
- Exposing structured data for visualization on the frontend  
- Offering a foundation for future integration with real IoT sensors or databases

## Tech Stack & Architecture

| Component        | Technology / Description                                      |
|------------------|--------------------------------------------------------------|
| Runtime          | Node.js                                                      |
| Framework        | Express.js / built‐in routing (via folder `routes/`)         |
| Data Storage     | JSON files (for simple demo mode)                            |
| API Structure    | RESTful endpoints under `routes/` for users and data         |
| Authentication   | Basic username/password stored in JSON (demo only)           |
| Future Ready     | Designed to scale toward real database, sensors & cloud API  |

## Key Features

- User authentication: registration and login endpoints  
- Demo data generation and serving: simulated live environmental metrics (water temp, air pressure, humidity, TDS)  
- JSON-based storage for quick setup and hackathon demonstration  
- Clear separation between frontend & backend concerns  
- Simple folder structure (`routes/`, `middleware/`, etc.) for maintainability  

## Installation & Setup

To set up the backend locally:

```bash
# 1. Clone the repository
git clone https://github.com/Nottommy11/CornHacks_Fall25_API.git
cd CornHacks_Fall25_API

# 2. Install dependencies
npm install

# 3. Run the server
node index.js
# or if a script is defined
npm start
