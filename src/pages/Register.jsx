"use client";
import { useState } from "react";
import api from "../utils/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.get("/csrf-cookie");
      const response = await api.post("/register", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src="/Welcome.gif"
            alt="Selamat Datang"
            width={300}
            height={200}
            className={styles.image}
            fetchPriority="high"
          />
        </div>
        <div className={styles.formContainer}>
          <h4 className={styles.heading}>Daftar Akun Baru</h4>
          <p className={styles.subheading}>
            Buat akun untuk bergabung dengan kami.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.form}>
              <label className={styles.label}>Nama</label>
              <input
                type="text"
                name="name"
                placeholder="Masukkan nama Anda"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.form}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Masukkan email Anda"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.form}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.form}>
              <label className={styles.label}>Konfirmasi Password</label>
              <input
                type="password"
                name="password_confirmation"
                placeholder="Konfirmasi password"
                value={formData.password_confirmation}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            {message && <p className={styles.errorMessage}>{message}</p>}
            <button type="submit" className={styles.submitButton}>
              Daftar
            </button>
          </form>
          <p className={styles.signin}>
            Dah Punya Akun? <Link href="/login">Loginin Aja</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
