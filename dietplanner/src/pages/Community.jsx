
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [username, setUsername] = useState("Anonymous");
  const [replyInputs, setReplyInputs] = useState({});
  const [showMyPosts, setShowMyPosts] = useState(false); 


  useEffect(() => {
    try {
      const userInfoRaw = localStorage.getItem("user");
      if (userInfoRaw) {
        const userInfo = JSON.parse(userInfoRaw);
        if (userInfo && userInfo.name) {
          setUsername(userInfo.name);
          console.log("Username set to:", userInfo.name); 
        }
      }
    } catch (error) {
      console.error("Error parsing userInfo:", error);
    }
  }, []);

  
  useEffect(() => {
    fetch("http://localhost:3000/api/getposts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched posts:", data); 
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  
  const addPost = async () => {
    if (!newPost.trim()) return;

    console.log("Submitting post with:", { content: newPost, username }); 

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost, username }),
      });

      if (!response.ok) throw new Error("Failed to add post");

      const addedPost = await response.json();
      console.log("Post added successfully:", addedPost); 
      setPosts([addedPost, ...posts]);
      setNewPost("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const addReply = async (postId) => {
    const replyText = replyInputs[postId]?.trim();
    if (!replyText) return;

    console.log("Submitting reply with:", { content: replyText, username }); 

    try {
      const response = await fetch(`http://localhost:3000/api/replies/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyText, username }),
      });

      if (!response.ok) throw new Error("Failed to add reply");

      const addedReply = await response.json();
      console.log("Reply added successfully:", addedReply); 
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, replies: [...post.replies, addedReply] } : post
        )
      );

      setReplyInputs((prevInputs) => ({ ...prevInputs, [postId]: "" }));
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

 
  const filteredPosts = showMyPosts
    ? posts.filter(
        (post) =>
          post.username === username ||
          post.replies.some((reply) => reply.username === username)
      )
    : posts;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-6">Community Forum</h1>

      
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${!showMyPosts ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setShowMyPosts(false)}
        >
          All Posts
        </button>
        <button
          className={`px-4 py-2 rounded ${showMyPosts ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setShowMyPosts(true)}
        >
          My Posts and Replies
        </button>
      </div>

      
      <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-md mb-4">
        <textarea
          className="w-full border p-2 rounded-md"
          rows="3"
          placeholder="Share your thoughts..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button
          onClick={addPost}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </div>

      
      <div className="max-w-3xl mx-auto">
        {filteredPosts.map((post) => (
          <div key={post._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <p className="text-lg">{post.content}</p>
            <p>
              <strong>Posted by:</strong> {post.username || "Anonymous"}
            </p>
            <p className="text-gray-500 text-sm">
              {post.timestamp ? new Date(post.timestamp).toLocaleString() : "Unknown time"}
            </p>

            
            <textarea
              className="w-full border p-2 rounded-md mt-2"
              rows="2"
              placeholder="Write a reply..."
              value={replyInputs[post._id] || ""}
              onChange={(e) =>
                setReplyInputs((prev) => ({ ...prev, [post._id]: e.target.value }))
              }
            />
            <button
              onClick={() => addReply(post._id)}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Reply
            </button>

            <div className="mt-4 pl-6 border-l-2 border-gray-300">
              {post.replies && post.replies.length > 0 ? (
                post.replies.map((reply, index) => (
                  <div key={reply._id} className="bg-gray-100 p-2 rounded-md mb-2">
                    <p>{reply.content}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Replied by:</strong> {reply.username || "Anonymous"} |{" "}
                      {reply.timestamp ? new Date(reply.timestamp).toLocaleString() : "Unknown"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No replies yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;