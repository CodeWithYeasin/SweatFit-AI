import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    height: "",
    weight: "",
    body_type: "",
    physical_disability: "",
    additional_info: "",
    gender: "",
  });

  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("No access token found. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setFormData({
            name: response.data.name || "",
            birthdate: response.data.birthdate || "",
            height: response.data.height || "",
            weight: response.data.weight || "",
            body_type: response.data.body_type || "",
            physical_disability: response.data.physical_disability || "",
            additional_info: response.data.additional_info || "",
            gender: response.data.gender || "",
          });
          setAge(response.data.age);
        }
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "birthdate") {
      const calculatedAge = calculateAge(value);
      setAge(calculatedAge);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("No access token found. Please log in.");
        return;
      }

      const dataToSend = {
        birthdate: formData.birthdate,
        height: parseFloat(formData.height) || null,
        weight: parseFloat(formData.weight) || null,
        body_type: formData.body_type || null,
        physical_disability: formData.physical_disability || null,
        additional_info: formData.additional_info || null,
        gender: formData.gender || null,
      };

      await axios.put(
        "http://localhost:8000/api/profile/",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Profile saved successfully!");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="profile-form">
        {/* Name (Read-only since it’s from User) */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled
        />

        {/* Gender */}
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Birthdate */}
        <label htmlFor="birthdate">Birthdate:</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          required
        />
        {age !== null && <p>Your Age: {age}</p>}

        {/* Height */}
        <label htmlFor="height">Height (in cm):</label>
        <input
          type="number"
          id="height"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
          step="0.1"
        />

        {/* Weight */}
        <label htmlFor="weight">Weight (in kg):</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
          step="0.1"
        />

        {/* Body Type */}
        <label htmlFor="body_type">Body Type:</label>
        <select
          id="body_type"
          name="body_type"
          value={formData.body_type}
          onChange={handleChange}
          required
        >
          <option value="">Select Body Type</option>
          <option value="ectomorph">Ectomorph</option>
          <option value="endomorph">Endomorph</option>
          <option value="mesomorph">Mesomorph</option>
        </select>

        {/* Physical Disability */}
        <label htmlFor="physical_disability">Physical Disability:</label>
        <textarea
          id="physical_disability"
          name="physical_disability"
          value={formData.physical_disability}
          onChange={handleChange}
          placeholder="Describe any physical disabilities (if applicable)"
        ></textarea>

        {/* Additional Info */}
        <label htmlFor="additional_info">Additional Information:</label>
        <textarea
          id="additional_info"
          name="additional_info"
          value={formData.additional_info}
          onChange={handleChange}
          placeholder="Any other relevant information"
        ></textarea>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
