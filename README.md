# FitLife

A modern and responsive fitness tracking web application built with React and Vite.

FitLife helps users manage their daily fitness activities from a single dashboard. Users can track workouts, nutrition, water intake, sleep, steps, achievements, and overall progress.

## Overview

FitLife is designed as a simple and user-friendly fitness companion with a clean interface and persistent local data.

The application currently provides:

- Fitness dashboard
- Workout tracking and timer
- Nutrition and meal tracking
- Water intake tracking
- Sleep tracking
- Daily step tracking
- Progress monitoring
- Achievement system
- BMI calculation
- Personal fitness profile
- Dark mode
- Responsive design
- Automatic daily data reset
- LocalStorage-based data persistence


## Features

### Dashboard

The dashboard provides a quick overview of the user's daily fitness activity, including:

- Calories
- Protein
- Carbohydrates
- Water
- Sleep
- Steps
- Daily goals and progress

### Workout

Users can start workouts using the built-in timer and maintain a history of completed workouts.

### Nutrition

Users can add meals and track:

- Calories
- Protein
- Carbohydrates
- Daily meals

### Water

Users can record their daily water intake and monitor their hydration goal.

### Sleep

Users can record sleep duration and adjust their daily sleep progress.

### Steps

Users can track daily steps and work toward a 10,000-step goal.

### Progress

The progress section provides workout history and fitness activity statistics.

### Achievements

FitLife includes achievement milestones such as:

- First Workout
- 3 Workouts
- 5 Workouts
- 10 Workouts
- Hydration Goal
- 10K Steps
- Good Sleep
- Healthy Start

### Profile

Users can maintain their fitness profile with:

- Name
- Age
- Gender
- Height
- Weight
- Fitness goal
- Activity level
- BMI

### Dark Mode

FitLife includes a persistent dark mode for a comfortable viewing experience.

### Daily Reset

Daily tracking information automatically resets when a new day begins.

The reset includes:

- Calories
- Protein
- Carbohydrates
- Meals
- Water
- Sleep
- Steps

Workout history remains available for long-term progress tracking.


## Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend UI |
| Vite | Development and build tool |
| JavaScript | Application logic |
| HTML5 | Page structure |
| CSS3 | Styling and responsive design |
| LocalStorage | Client-side data persistence |
| Git | Version control |
| GitHub | Repository hosting |


## Project Structure

```text
FitLife/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Navbar.css
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Home.css
    │   │   ├── Workout.jsx
    │   │   ├── Workout.css
    │   │   ├── Diet.jsx
    │   │   ├── Diet.css
    │   │   ├── Progress.jsx
    │   │   ├── Progress.css
    │   │   ├── Achievements.jsx
    │   │   ├── Achievements.css
    │   │   ├── Profile.jsx
    │   │   └── Profile.css
    │   │
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    │
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    └── .gitignore
