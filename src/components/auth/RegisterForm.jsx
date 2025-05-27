import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { register as registerUser  } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser (formData);
      alert("Registration successful! Please log in.");
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ backgroundColor: "#f8f9fa", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <div
        className="card shadow-lg rounded-4 p-4"
        style={{ width: "400px", backgroundColor: "white" }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#343a40" }}>
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="d-grid gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="form-control form-control-lg rounded-pill shadow-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-control form-control-lg rounded-pill shadow-sm"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-control form-control-lg rounded-pill shadow-sm"
            required
          />
          <button
            type="submit"
            className="btn btn-success btn-lg rounded-pill fw-semibold"
            style={{ backgroundColor: "#28a745", boxShadow: "0 4px 12px rgb(40 167 69 / 0.4)" }}
          >
            Register
          </button>
        </form>
        <div className="text-center mt-3" style={{ color: "#6c757d" }}>
          Already have an account?{" "}
          <a href="/login" className="text-primary fw-semibold text-decoration-none">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
