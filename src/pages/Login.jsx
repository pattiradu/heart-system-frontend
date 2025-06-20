import React, { useState } from "react";
import backend from "@/utils";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data: users } = await backend.get("/users");
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        const role = user.role?.role_name?.toLowerCase();
        if (role === "admin" || role === "doctor") {
          navigate("/");
        } else if (role === "health_advisor") {
          navigate("/dashboard/health-advisor");
        } else {
          navigate("/dashboard/user");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-background">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-card p-8 rounded-lg shadow-md w-full max-w-sm space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <Input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
} 