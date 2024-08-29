"use client";

import { useState } from "react";
import { useRouter } from "next/router"; // Correct import
import { signIn } from "next-auth/react";
import Link from "next/link";
import Layout from "../../components/layout";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign In</h4>
              {error && <div className="alert alert-danger">{error}</div>}
              <form className="row g-2" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <Link href="/auth/forgot-password">
                    <a className="text-decoration-none">Forgot password?</a>
                  </Link>
                </div>
                <div className="col-md-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <hr className="text-muted my-0" />
            <div className="text-center p-3">
              Don’t have an account?{" "}
              <Link href="/auth/sign-up">
                <a className="text-decoration-none fw-medium">Register</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth>
      {page}
    </Layout>
  );
};

export default Login;
