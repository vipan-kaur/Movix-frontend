import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { BACKEND_SERVER_URL } from "../utils/utl";
import "./style.scss";

function Register() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityQuestionAnswer: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const verifyEmail = async () => {
    // No OTP step; proceed to final form
    setStep(3);
  };

  const verifyOtp = async () => {
    // OTP removed
    setStep(3);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (data.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    if (!data.securityQuestion || !data.securityQuestionAnswer) {
      alert("Please select a security question and provide an answer.");
      return;
    }

    try {
      const res = await fetch(BACKEND_SERVER_URL + "/signup/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          securityQuestion: data.securityQuestion,
          securityQuestionAnswer: data.securityQuestionAnswer,
        }),
      });

      if (res.ok) {
        alert("Registration successful");
        navigate("/login2");
      } else {
        const errData = await res.json();
        alert(errData.error || "Registration failed.");
      }
    } catch (error) {
      alert("Error occurred during registration.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="authContainer">
      <div className="authCard">
        <h2>Register</h2>

        <div className="stepIndicators">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`dot ${step >= s ? "active" : ""} ${step > s ? "completed" : ""}`}
            ></div>
          ))}
        </div>

        <form onSubmit={submit}>
          {step === 1 && (
            <>
                    <div className="formGroup">
                      <label>Name</label>
                      <input type="text" name="name" value={data.name} onChange={handleChange} />
                    </div>
                    <div className="formGroup">
                      <label>Email</label>
                      <input type="email" name="email" value={data.email} onChange={handleChange} />
                    </div>
                    <button type="button" onClick={verifyEmail} className="button">
                      Continue
                    </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* kept for compatibility; will proceed to final step */}
              <button type="button" onClick={() => setStep(3)} className="button">
                Continue
              </button>
              <button type="button" onClick={() => setStep(1)} className="button secondary">
                Back
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <div className="formGroup">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
              <div className="formGroup">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="formGroup">
                <label>Security Question</label>
                <select
                  name="securityQuestion"
                  value={data.securityQuestion}
                  onChange={handleChange}
                >
                  <option value="">Select a question</option>
                  <option value="Your mother's maiden name?">
                    Your mother's maiden name?
                  </option>
                  <option value="Your first pet's name?">Your first pet's name?</option>
                  <option value="Your favorite teacher's name?">
                    Your favorite teacher's name?
                  </option>
                  <option value="Your best friend's name?">Your best friend's name?</option>
                </select>
              </div>
              <div className="formGroup">
                <label>Answer</label>
                <input
                  type="text"
                  name="securityQuestionAnswer"
                  value={data.securityQuestionAnswer}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="button">
                Register
              </button>
              <button type="button" onClick={() => setStep(2)} className="button secondary">
                Back
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
