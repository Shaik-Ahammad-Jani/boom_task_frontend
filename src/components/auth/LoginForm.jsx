// import React, { useState } from "react";
// import { login as loginUser } from "../../services/authService";
// import { useAuth } from "../../context/AuthContext";

// const LoginForm = () => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(formData);
//       login(res.data.user, res.data.token);
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         className="border p-2 w-full"
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         className="border p-2 w-full"
//       />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2">
//         Login
//       </button>
//     </form>
//   );
// };

// export default LoginForm;

// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useState } from "react";
// import { login as loginUser  } from "../../services/authService";
// import { useAuth } from "../../context/AuthContext";

// const LoginForm = () => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser (formData);
//       login(res.data.user, res.data.token);
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center ">
//       <div className="card shadow" style={{ width: '400px' }}>
//         <div className="card-body">
//           <h5 className="card-title text-center">Login</h5>
//           <form onSubmit={handleSubmit} className="d-grid gap-3">
//             <div className="form-group">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="form-control"
//                 required
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


// import React, { useState } from "react";
// import { login as loginUser } from "../../services/authService";
// import { useAuth } from "../../context/AuthContext";

// const LoginForm = () => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(formData);
//       login(res.data.user, res.data.token);
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center bg-light">
//       <div className="card shadow p-4" style={{ maxWidth: "600px", width: "100%" }}>
//         <h2 className="text-center mb-4 text-primary">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               name="email"
//               placeholder="you@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               name="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-100">Login</button>
//         </form>
//         <p className="text-center mt-3 text-muted">
//           Don’t have an account? <a href="/register">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { login as loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate()


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      login(res.data.user, res.data.token);
      navigate('/feed')
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ backgroundColor: "#f8f9fa", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <div
        className="card shadow-lg rounded-4 p-4"
        style={{ width: "380px", backgroundColor: "white" }}
      >
        <h2 className="text-center mb-4 fw-bold" style={{ color: "#343a40" }}>
          Login
        </h2>
        <form onSubmit={handleSubmit} className="d-grid gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
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
            className="btn btn-primary btn-lg rounded-pill fw-semibold"
            style={{ backgroundColor: "#0d6efd", boxShadow: "0 4px 12px rgb(13 110 253 / 0.4)" }}
            
          >
            Login
          </button>
        </form>
        <div className="text-center mt-3" style={{ color: "#6c757d" }}>
          Don't have an account?{" "}
          <a href="/register" className="text-primary fw-semibold text-decoration-none">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

