# SweatFit AI

An AI-powered fitness web app: track food and exercise calories, chat with an AI fitness coach, and generate personalized workout and diet plans.

> CSE 299 (Junior Design) project, North South University

![Home](screenshots/15-home.png)

## Features

| Feature | What it does | Powered by |
|---|---|---|
| **Sign up / Sign in** | Email and password auth with JWT access and refresh tokens | Django REST Framework + SimpleJWT |
| **User Profile** | Gender, birthdate (age auto-calculated), height, weight, body type, notes | Django `profiles` app |
| **Self Tracking (Calorie Tracker)** | Type what you ate and what exercise you did in plain English, get calories in/out and net balance | Nutritionix Natural Language API |
| **Dashboard** | Profile summary plus food and exercise history tables and charts | Chart.js / Recharts |
| **Chatbot** | Ask any fitness or nutrition question | OpenRouter (`deepseek/deepseek-r1:free`) |
| **Workout Plan** | Weekly plan by goal, level, equipment and focus area; export to PDF | API-Ninjas Exercises API + jsPDF |
| **Diet Plan** | Daily meal plan by calorie limit, diet type and excluded ingredients; export to PDF | Spoonacular Meal Planner API + jsPDF |

## Tech Stack

- **Frontend:** React 19, Vite, React Router, Axios, Chart.js, Recharts, jsPDF, React Markdown
- **Backend:** Django, Django REST Framework, SimpleJWT, django-cors-headers
- **Database:** PostgreSQL

## Project Structure

```
sweatfitai/
├── backend/                 # Django REST API
│   ├── backend/             # settings.py, urls.py
│   ├── api/                 # sign up / sign in (JWT), email auth backend
│   ├── profiles/            # user profile model + API
│   ├── selftracking/        # food & exercise tracking models + API
│   ├── aitrainer/, dashboard/
│   ├── manage.py
│   └── requirements.txt
├── frontend/                # React + Vite app
│   └── src/
│       ├── pages/           # Home, Login, Profile, Dashboard, Chatbot2, AITrainer
│       └── components/      # SelfTracking, WorkoutPlan, DietPlan, Navbar, ...
└── screenshots/             # app screenshots + a sample exported meal plan PDF
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/signup/` | Create account, returns JWT tokens |
| POST | `/api/users/signin/` | Log in with email + password, returns JWT tokens |
| GET / PUT | `/api/profile/` | Get or update the logged-in user's profile |
| GET | `/api/selftracking/track-food/` | Logged-in user's food history |
| GET | `/api/selftracking/track-exercise/` | Logged-in user's exercise history |

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL

### 1. Clone

```bash
git clone https://github.com/<your-username>/sweatfitai.git
cd sweatfitai
```

### 2. Add your API keys

API keys were removed from this repository. Replace the placeholders with your own keys:

| Placeholder | File(s) | Get a key from |
|---|---|---|
| `YOUR_OPENROUTER_API_KEY` | `frontend/src/pages/Chatbot2.jsx` | https://openrouter.ai |
| `YOUR_SPOONACULAR_API_KEY` | `frontend/src/components/DietPlan.jsx` | https://spoonacular.com/food-api |
| `YOUR_API_NINJAS_KEY` | `frontend/src/components/WorkoutPlan.jsx`, `Muscle.jsx` | https://api-ninjas.com |
| `YOUR_NUTRITIONIX_APP_ID`, `YOUR_NUTRITIONIX_API_KEY` | `frontend/src/components/SelfTracking.jsx`, `backend/backend/settings.py` | https://developer.nutritionix.com |
| `YOUR_DB_PASSWORD` | `backend/backend/settings.py` | your local PostgreSQL password |
| `django-insecure-change-this-secret-key` | `backend/backend/settings.py` | any long random string |

> Never commit real keys. If you move them into a `.env` file, it is already in `.gitignore`.

### 3. Backend

```bash
# create the database first (psql):  CREATE DATABASE sweatfitai;
cd backend
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # macOS / Linux
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

The API runs at `http://localhost:8000`.

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Screenshots

### Login & Sign up
| Login | Sign up |
|---|---|
| ![Login](screenshots/13-login.png) | ![Sign up](screenshots/12-signup.png) |

### Home
| Home (logged in) | Features |
|---|---|
| ![Home logged in](screenshots/11-home-logged-in.png) | ![Features](screenshots/14-home-features.png) |

### Profile
![Profile](screenshots/10-profile.png)

### Self Tracking: Calorie Tracker
![Calorie Tracker](screenshots/01-selftracking-calorie-tracker.png)

### Dashboard
| Profile & food table | Food chart | Exercise charts |
|---|---|---|
| ![Dashboard](screenshots/05-dashboard-profile-food-table.png) | ![Food chart](screenshots/04-dashboard-food-chart.png) | ![Exercise charts](screenshots/03-dashboard-exercise-charts.png) |

### AI Chatbot
![Chatbot](screenshots/02-chatbot.png)

### Workout Plan
| Form | Weekly plan | Save as PDF |
|---|---|---|
| ![Workout form](screenshots/09-workout-plan-form.png) | ![Weekly plan](screenshots/08-workout-plan-weekly.png) | ![Save PDF](screenshots/07-workout-plan-save-pdf.png) |

### Diet Plan
![Diet Plan](screenshots/06-diet-plan.png)

Sample exported meal plan: [sample-meal-plan.pdf](screenshots/sample-meal-plan.pdf)
