"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/axios";
import Image from "next/image";
import Link from "next/link";
import styles from "./LoginPage.module.css";
import { AuthContext } from "@/utils/AuthContext";
import Swal from "sweetalert2";

const LoginPage = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("API Response:", data); // Log respons server untuk memeriksa isi data

      if (response.ok) {
        dispatch({
          type: "LOGIN",
          payload: { token: data.token }, // Pastikan payload yang benar dikirim
        });

        await Swal.fire({
          title: "holaa",
          text: "berhasil login.",
          icon: "success",
          confirmButtonText: "OK",
        });

        router.push("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
    // try {
    //   const response = await api.post(
    //     "/login",
    //     {
    //       email,
    //       password,
    //     },
    //     {
    //       withCredentials: true,
    //     }
    //   );
    //   console.log("Token berhasil diterima", response.data);
    //   localStorage.setItem("token", response.data.token);

    //   router.push("/");
    // } catch (error) {
    //   console.error(
    //     "Login gagal:",
    //     error.response?.data?.message || error.message
    //   );
    //   setErrorMessage("Login gagal. Periksa email/password Anda.");
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src="/wcback.gif"
            alt="Welcome Back"
            width={100}
            height={200}
            className={styles.image}
            fetchPriority="high"
          />
        </div>
        <div className={styles.formContainer}>
          <h1 className={styles.heading}>Selamat Datang Kembali</h1>
          <p className={styles.subheading}>
            Masuk untuk mengomentari Blog/Arena Gelud ini.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className={styles.form}
          >
            <div className={styles.form}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.form}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <button type="submit" className={styles.submitButton}>
              Masuk
            </button>
          </form>

          <p className={styles.signup}>
            Ga Punya Akun Yah? <Link href="/signup">Buat dulu bang</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
