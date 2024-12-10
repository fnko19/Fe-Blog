import { useState, useEffect } from "react";
//import api from "../../services/api";
import api from "@/utils/axios";

const PostPage = ({ post, comments }) => {
  const [content, setContent] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    // Periksa apakah pengguna sudah login (misalnya dengan token).
    api
      .get("/user")
      .then(() => setUserLoggedIn(true))
      .catch(() => setUserLoggedIn(false));
  }, []);

  const submitComment = async () => {
    if (!userLoggedIn) {
      alert("Silakan login terlebih dahulu!");
      return;
    }

    try {
      const response = await api.post(`/posts/${post.id}/comments`, {
        content,
      });
      alert("Komentar berhasil ditambahkan");
      console.log(response.data);
    } catch (error) {
      alert("Gagal mengirim komentar");
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <h3>Komentar:</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>
            <b>{comment.user.name}</b>: {comment.content}
          </p>
        </div>
      ))}

      <h3 className="text-red-500">Tulis komentar Anda:</h3>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={submitComment}>Kirim Komentar</button>
    </div>
  );
};

// Mengambil data post dan komentar dari server secara dinamis.
export async function getServerSideProps(context) {
  const { id } = context.params;

  const resPost = await api.get(`/posts/${id}`);
  const resComments = await api.get(`/posts/${id}/comments`);

  return {
    props: {
      post: resPost.data,
      comments: resComments.data,
    },
  };
}

export default PostPage;
