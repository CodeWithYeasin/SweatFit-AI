import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [foodData, setFoodData] = useState([]);
  const [exerciseData, setExerciseData] = useState([]);
  const [foodTableData, setFoodTableData] = useState([]);
  const [exerciseTableData, setExerciseTableData] = useState([]);
  const [netCaloriesData, setNetCaloriesData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:8000/api/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        setProfileError(err.response?.data?.detail || "Failed to fetch profile");
      } finally {
        setProfileLoading(false);
      }
    };

    const fetchTrackingData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const foodRes = await axios.get("http://localhost:8000/api/selftracking/track-food/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const exerciseRes = await axios.get("http://localhost:8000/api/selftracking/track-exercise/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sortedFood = foodRes.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const sortedExercise = exerciseRes.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setFoodTableData(sortedFood);
        setExerciseTableData(sortedExercise);

        const aggregateByDate = (data, key) => {
          const grouped = {};
          data.forEach(item => {
            const date = new Date(item.created_at).toLocaleDateString();
            if (!grouped[date]) grouped[date] = 0;
            grouped[date] += item[key];
          });
          return Object.entries(grouped).map(([date, value]) => ({
            date,
            [key]: value,
          }));
        };

        const foodDataByDate = aggregateByDate(sortedFood, "calories");
        const exerciseDataByDate = aggregateByDate(sortedExercise, "calories_burned");

        setFoodData(foodDataByDate);
        setExerciseData(exerciseDataByDate);

        // Calculate net calories
        const netCalories = foodDataByDate.map(foodEntry => {
          const exerciseEntry = exerciseDataByDate.find(ex => ex.date === foodEntry.date) || { calories_burned: 0 };
          return {
            date: foodEntry.date,
            netCalories: foodEntry.calories - exerciseEntry.calories_burned,
          };
        });

        setNetCaloriesData(netCalories);
      } catch (err) {
        setDataError(err.response?.data?.detail || "Failed to fetch tracking data");
      } finally {
        setDataLoading(false);
      }
    };

    fetchProfile();
    fetchTrackingData();
  }, []);

  if (profileLoading || dataLoading) return <div>Loading...</div>;
  if (profileError) return <div>Error: {profileError}</div>;
  if (dataError) return <div>Error: {dataError}</div>;

  return (
    <div className="dashboard-container">
      <section className="profile-section">
        <h1>Welcome, {profile.name}!</h1>
        <div className="profile-details">
          <p>Gender: {profile.gender || "Not set"}</p>
          <p>Age: {profile.age || "Not calculated"}</p>
          <p>Birthdate: {profile.birthdate || "Not set"}</p>
          <p>Height: {profile.height ? `${profile.height} cm` : "Not set"}</p>
          <p>Weight: {profile.weight ? `${profile.weight} kg` : "Not set"}</p>
          <p>Body Type: {profile.body_type || "Not set"}</p>
          <p>Physical Disability: {profile.physical_disability || "None"}</p>
          <p>Additional Info: {profile.additional_info || "None"}</p>
        </div>
      </section>

      <section className="tracking-section">
        <h2>🍽️ Food Calories Table</h2>
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Food</th>
                <th>Calories (kcal)</th>
              </tr>
            </thead>
            <tbody>
              {foodTableData.slice(0, 10).map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>{item.food_name}</td>
                  <td>{item.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>📊 Food Calories Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={foodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories" fill="#00f3ff" />
          </BarChart>
        </ResponsiveContainer>

        <h2>🏋️ Exercise Calories Table</h2>
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Exercise</th>
                <th>Calories Burned</th>
              </tr>
            </thead>
            <tbody>
              {exerciseTableData.slice(0, 10).map((item, index) => (
                <tr key={index}>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>{item.exercise_name}</td>
                  <td>{item.calories_burned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>📈 Exercise Calories Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={exerciseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="calories_burned" stroke="#ff00ff" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>

        <h3>📉 Net Calories Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={netCaloriesData}>
            <defs>
              <linearGradient id="colorNetCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="netCalories" stroke="#82ca9d" fillOpacity={1} fill="url(#colorNetCalories)" />
          </AreaChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default Dashboard;
