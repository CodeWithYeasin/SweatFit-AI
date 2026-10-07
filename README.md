<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:A0522D,100:2ECC71&height=200&section=header&text=SweatFit%20AI&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Your%20AI-powered%20personal%20fitness%20coach&descAlignY=58&descSize=18" width="100%" alt="SweatFit AI" />

<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=600&size=22&duration=3000&pause=800&color=2ECC71&center=true&vCenter=true&width=600&lines=Track+your+calories+in+plain+English+%F0%9F%8D%9A;Chat+with+an+AI+fitness+coach+%F0%9F%A4%96;Get+personalized+workout+plans+%F0%9F%8F%8B%EF%B8%8F;Generate+diet+plans+%26+export+to+PDF+%F0%9F%A5%97" alt="Typing SVG" /></a>

<br/>

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![DRF](https://img.shields.io/badge/Django_REST-A30000?style=for-the-badge&logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT_Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)

![Course](https://img.shields.io/badge/CSE_299-Junior_Design_Project-A0522D?style=flat-square)
![University](https://img.shields.io/badge/North_South_University-Bangladesh-2ECC71?style=flat-square)
![Status](https://img.shields.io/badge/status-completed-success?style=flat-square)

<br/>

<img src="screenshots/15-home.png" width="85%" alt="SweatFit AI Home" />

</div>

<br/>

## 📑 Table of Contents

- [✨ About](#-about)
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ How It Works](#️-how-it-works)
- [📸 Screenshots](#-screenshots)
- [⚙️ Getting Started](#️-getting-started)
- [🔌 API Endpoints](#-api-endpoints)
- [📁 Project Structure](#-project-structure)

<br/>

## ✨ About

**SweatFit AI** is a full-stack fitness web app that brings everything you need for a healthy lifestyle into one place. Log what you ate and how you trained **in plain English**. The app works out the calories, keeps your history on a dashboard, answers your fitness questions through an AI chatbot, and builds **personalized workout and diet plans** you can save as PDF.

> 🎓 Built as the **CSE 299: Junior Design** course project at **North South University**.

<br/>

## 🚀 Features

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🔐 Secure Auth</h3>
      Sign up and sign in with email and password. Sessions use <b>JWT access and refresh tokens</b>.
    </td>
    <td width="50%" valign="top">
      <h3>👤 Smart Profile</h3>
      Store gender, height, weight, body type and notes. <b>Age is calculated automatically</b> from your birthdate.
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🍚 Calorie Tracker</h3>
      Type <code>"4kg rice 3 eggs"</code> and <code>"60 min running"</code>. The app returns calories in, calories burned and your <b>net balance</b>.
    </td>
    <td width="50%" valign="top">
      <h3>📊 Dashboard</h3>
      Your food and exercise history in <b>tables, bar charts, line charts and area charts</b>.
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🤖 AI Chatbot</h3>
      Ask any fitness or nutrition question and get a structured answer from <b>DeepSeek R1</b> via OpenRouter.
    </td>
    <td width="50%" valign="top">
      <h3>🏋️ Workout Planner</h3>
      A weekly plan built from your <b>goal, level, equipment and focus area</b>. Export it to PDF.
    </td>
  </tr>
  <tr>
    <td colspan="2" valign="top" align="center">
      <h3>🥗 Diet Planner</h3>
      A daily meal plan built from your <b>calorie limit, diet type (Keto, Vegan…) and excluded ingredients</b>, with full macros. Export it to PDF.
    </td>
  </tr>
</table>

<br/>

## 🛠️ Tech Stack

| Layer | Technologies |
|:---:|---|
| **Frontend** | ![React](https://img.shields.io/badge/-React-20232A?logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) ![React Router](https://img.shields.io/badge/-React_Router-CA4245?logo=reactrouter&logoColor=white) ![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white) ![Chart.js](https://img.shields.io/badge/-Chart.js-FF6384?logo=chartdotjs&logoColor=white) ![Recharts](https://img.shields.io/badge/-Recharts-22B5BF) ![jsPDF](https://img.shields.io/badge/-jsPDF-E34F26) |
| **Backend** | ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white) ![Django](https://img.shields.io/badge/-Django-092E20?logo=django&logoColor=white) ![DRF](https://img.shields.io/badge/-DRF-A30000?logo=django&logoColor=white) ![SimpleJWT](https://img.shields.io/badge/-SimpleJWT-000000?logo=jsonwebtokens&logoColor=white) |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white) |
| **External APIs** | ![OpenRouter](https://img.shields.io/badge/-OpenRouter_(DeepSeek_R1)-6467F2) ![Nutritionix](https://img.shields.io/badge/-Nutritionix-7AB800) ![API Ninjas](https://img.shields.io/badge/-API_Ninjas-F7931E) ![Spoonacular](https://img.shields.io/badge/-Spoonacular-2ECC71) |

<br/>

## 🏗️ How It Works

```mermaid
flowchart LR
    U([👤 User]) --> FE[⚛️ React + Vite<br/>Frontend]
    FE -- JWT --> BE[🐍 Django REST API]
    BE --> DB[(🐘 PostgreSQL)]
    FE --> NX[🍎 Nutritionix<br/>Calories]
    FE --> OR[🤖 OpenRouter<br/>DeepSeek R1]
    FE --> AN[🏋️ API Ninjas<br/>Exercises]
    FE --> SP[🥗 Spoonacular<br/>Meal Plans]
```

<br/>

## 📸 Screenshots

### 🔐 Login & Sign Up
<table>
  <tr>
    <td align="center"><img src="screenshots/13-login.png" width="100%"/><br/><sub><b>Login</b></sub></td>
    <td align="center"><img src="screenshots/12-signup.png" width="100%"/><br/><sub><b>Sign Up</b></sub></td>
  </tr>
</table>

### 🏠 Home
<table>
  <tr>
    <td align="center"><img src="screenshots/11-home-logged-in.png" width="100%"/><br/><sub><b>Home (logged in)</b></sub></td>
    <td align="center"><img src="screenshots/14-home-features.png" width="100%"/><br/><sub><b>Features section</b></sub></td>
  </tr>
</table>

### 🍚 Calorie Tracker & 👤 Profile
<table>
  <tr>
    <td align="center"><img src="screenshots/01-selftracking-calorie-tracker.png" width="100%"/><br/><sub><b>Calorie Tracker</b></sub></td>
    <td align="center"><img src="screenshots/10-profile.png" width="100%"/><br/><sub><b>User Profile</b></sub></td>
  </tr>
</table>

### 📊 Dashboard
<table>
  <tr>
    <td align="center"><img src="screenshots/05-dashboard-profile-food-table.png" width="100%"/><br/><sub><b>Profile & Food Table</b></sub></td>
    <td align="center"><img src="screenshots/04-dashboard-food-chart.png" width="100%"/><br/><sub><b>Food Calories Chart</b></sub></td>
    <td align="center"><img src="screenshots/03-dashboard-exercise-charts.png" width="100%"/><br/><sub><b>Exercise & Net Calories</b></sub></td>
  </tr>
</table>

### 🤖 AI Chatbot
<div align="center">
  <img src="screenshots/02-chatbot.png" width="80%"/>
</div>

### 🏋️ Workout Planner
<table>
  <tr>
    <td align="center"><img src="screenshots/09-workout-plan-form.png" width="100%"/><br/><sub><b>Plan Form</b></sub></td>
    <td align="center"><img src="screenshots/08-workout-plan-weekly.png" width="100%"/><br/><sub><b>Weekly Plan</b></sub></td>
    <td align="center"><img src="screenshots/07-workout-plan-save-pdf.png" width="100%"/><br/><sub><b>Save as PDF</b></sub></td>
  </tr>
</table>

### 🥗 Diet Planner
<div align="center">
  <img src="screenshots/06-diet-plan.png" width="70%"/>
  <br/>
  📄 <a href="screenshots/sample-meal-plan.pdf"><b>View a sample exported meal plan (PDF)</b></a>
</div>

<br/>

## ⚙️ Getting Started

### ✅ Prerequisites

- 🐍 Python **3.10+**
- 🟢 Node.js **18+**
- 🐘 PostgreSQL

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/sweatfitai.git
cd sweatfitai
```

### 2️⃣ Add your API keys

> [!IMPORTANT]
> API keys have been removed from this repository. Replace each placeholder with your own key before running the app.

| Placeholder | File(s) | Get a key |
|---|---|---|
| `YOUR_OPENROUTER_API_KEY` | `frontend/src/pages/Chatbot2.jsx` | [openrouter.ai](https://openrouter.ai) |
| `YOUR_SPOONACULAR_API_KEY` | `frontend/src/components/DietPlan.jsx` | [spoonacular.com](https://spoonacular.com/food-api) |
| `YOUR_API_NINJAS_KEY` | `frontend/src/components/WorkoutPlan.jsx`, `Muscle.jsx` | [api-ninjas.com](https://api-ninjas.com) |
| `YOUR_NUTRITIONIX_APP_ID` / `YOUR_NUTRITIONIX_API_KEY` | `frontend/src/components/SelfTracking.jsx`, `backend/backend/settings.py` | [nutritionix.com](https://developer.nutritionix.com) |
| `YOUR_DB_PASSWORD` | `backend/backend/settings.py` | Your local PostgreSQL password |
| `django-insecure-change-this-secret-key` | `backend/backend/settings.py` | Any long random string |

> [!WARNING]
> Never commit real keys. `.env` files are already listed in `.gitignore`.

### 3️⃣ Run the backend

```bash
# First, create the database in psql:  CREATE DATABASE sweatfitai;
cd backend
python -m venv venv
venv\Scripts\activate            # Windows
# source venv/bin/activate       # macOS / Linux
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

🟢 The API runs at **http://localhost:8000**

### 4️⃣ Run the frontend

```bash
cd frontend
npm install
npm run dev
```

🟢 The app runs at **http://localhost:5173**

<br/>

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|:---:|---|:---:|---|
| ![POST](https://img.shields.io/badge/POST-49CC90?style=flat-square) | `/api/users/signup/` | ❌ | Create an account and get JWT tokens |
| ![POST](https://img.shields.io/badge/POST-49CC90?style=flat-square) | `/api/users/signin/` | ❌ | Log in with email and password and get JWT tokens |
| ![GET](https://img.shields.io/badge/GET-61AFFE?style=flat-square) ![PUT](https://img.shields.io/badge/PUT-FCA130?style=flat-square) | `/api/profile/` | ✅ | Get or update the user's profile |
| ![GET](https://img.shields.io/badge/GET-61AFFE?style=flat-square) | `/api/selftracking/track-food/` | ✅ | Get the user's food history |
| ![GET](https://img.shields.io/badge/GET-61AFFE?style=flat-square) | `/api/selftracking/track-exercise/` | ✅ | Get the user's exercise history |

<br/>

## 📁 Project Structure

```
sweatfitai/
├── 🐍 backend/                 Django REST API
│   ├── backend/               settings.py, urls.py
│   ├── api/                   sign up / sign in (JWT) + email auth backend
│   ├── profiles/              user profile model & API
│   ├── selftracking/          food & exercise tracking models & API
│   ├── aitrainer/, dashboard/
│   ├── manage.py
│   └── requirements.txt
├── ⚛️ frontend/                React + Vite app
│   └── src/
│       ├── pages/             Home, Login, Profile, Dashboard, Chatbot, AI Trainer
│       ├── components/        SelfTracking, WorkoutPlan, DietPlan, Navbar …
│       └── styles/
└── 📸 screenshots/             app screenshots + sample meal plan PDF
```

<br/>

<div align="center">

### ⭐ If you like this project, give it a star!

**Made with ❤️ and 💪 for CSE 299 at North South University**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2ECC71,100:A0522D&height=120&section=footer" width="100%" />

</div>
