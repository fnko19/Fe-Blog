"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "../utils/axios";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();

    api
      .get("/user")
      .then((response) => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, []);

  const handleCommentSubmit = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to login to comment.");
        return;
      }

      await api.post(
        `/posts/${postId}/comments`,
        { content: comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Comment added!");
      setComment("");
    } catch (error) {
      alert("Error submitting comment. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <h2 className={styles.postTitle}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>
            <p className={styles.postContent}>{post.content}</p>
            <h3 className={styles.commentsHeader}>Comments:</h3>
            <ul>
              {(post.comments || []).map((comment) => (
                <li key={comment.id} className={styles.comment}>
                  <strong>{comment.user?.name || "Unknown"}:</strong>{" "}
                  {comment.content}
                </li>
              ))}
            </ul>
            {loggedIn ? (
              <div className={styles.commentInput}>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment"
                  required
                />
                <button onClick={() => handleCommentSubmit(post.id)}>
                  Submit
                </button>
              </div>
            ) : (
              <p className={styles.loginPrompt}>
                You must <a href="/login">login</a> to comment.
              </p>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
