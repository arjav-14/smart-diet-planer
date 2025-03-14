// import { useState, useEffect } from "react";

// const Community = () => {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState("");
//   const [username, setUsername] = useState("Anonymous"); // Default username

//   // Fetch user info from localStorage on component mount
//   useEffect(() => {
//     const userInfoRaw = localStorage.getItem("userInfo");
//     console.log("Raw userInfo from localStorage:", userInfoRaw); // Debugging

//     try {
//       const userInfo = userInfoRaw ? JSON.parse(userInfoRaw) : null;
//       console.log("Parsed userInfo:", userInfo);

//       if (userInfo && userInfo.name) {
//         setUsername(userInfo.name); // ✅ Corrected extraction of username
//         console.log("Username set to:", userInfo.name);
//       } else {
//         console.log("No valid username found, using Anonymous.");
//       }
//     } catch (error) {
//       console.error("Error parsing userInfo:", error);
//     }
//   }, []);

//   // Fetch all posts
//   useEffect(() => {
//     fetch("http://localhost:3000/api/getposts")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched posts:", data); // Debugging
//         setPosts(data);
//       })
//       .catch((error) => console.error("Error fetching posts:", error));
//   }, []);

//   // Add a new post
//   const addPost = async () => {
//     if (!newPost.trim()) return;

//     console.log("Submitting post with:", { content: newPost, username });

//     try {
//       const response = await fetch("http://localhost:3000/api/posts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           content: newPost,
//           username, // ✅ Ensuring username is sent correctly
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add post");
//       }

//       const addedPost = await response.json();
//       console.log("Post added successfully:", addedPost);

//       setPosts([addedPost, ...posts]);
//       setNewPost("");
//     } catch (error) {
//       console.error("Error adding post:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Community Forum</h1>

//       {/* Post Input Box */}
//       <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-md mb-4">
//         <textarea
//           className="w-full border p-2 rounded-md"
//           rows="3"
//           placeholder="Share your thoughts..."
//           value={newPost}
//           onChange={(e) => setNewPost(e.target.value)}
//         ></textarea>
//         <button
//           onClick={addPost}
//           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Post
//         </button>
//       </div>

//       {/* Display Posts */}
//       <div className="max-w-3xl mx-auto ">
//   {posts.map((post, index) => (
//     <div key={post._id || `post-${index}`} className="bg-white p-4 mb-4 rounded-lg shadow-md ">
//       <p className="text-lg">{post.content}</p>
//       <p>
//         <strong>Posted by:</strong> {post.username || "Anonymous"}
//       </p>
//       <p className="text-gray-500 text-sm">
//         Posted on: {post.timestamp ? new Date(post.timestamp).toLocaleString() : "Unknown"}
//       </p>
//       {/* ✅ Fixed button styles */}
//       <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-2 ">
//         Reply
//       </button>
//     </div>
//   ))}
// </div>

//     </div>
//   );
// };

// export default Community;
// import { useState, useEffect } from "react";

// const Community = () => {
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState("");
//   const [username, setUsername] = useState("Anonymous"); // Default username
//   const [replyInputs, setReplyInputs] = useState({}); // Stores reply text for each post

//   // Fetch user info from localStorage on component mount
//   useEffect(() => {
//     const userInfoRaw = localStorage.getItem("userInfo");
//     console.log("Raw userInfo from localStorage:", userInfoRaw);

//     try {
//       const userInfo = userInfoRaw ? JSON.parse(userInfoRaw) : null;
//       console.log("Parsed userInfo:", userInfo);

//       if (userInfo && userInfo.name) {
//         setUsername(userInfo.name);
//         console.log("Username set to:", userInfo.name);
//       } else {
//         console.log("No valid username found, using Anonymous.");
//       }
//     } catch (error) {
//       console.error("Error parsing userInfo:", error);
//     }
//   }, []);

//   // Fetch all posts
//   useEffect(() => {
//     fetch("http://localhost:3000/api/getposts")
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("Fetched posts:", data);
//         setPosts(data);
//       })
//       .catch((error) => console.error("Error fetching posts:", error));
//   }, []);

//   // Add a new post
//   const addPost = async () => {
//     if (!newPost.trim()) return;

//     try {
//       const response = await fetch("http://localhost:3000/api/posts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: newPost, username }),
//       });

//       if (!response.ok) throw new Error("Failed to add post");

//       const addedPost = await response.json();
//       setPosts([addedPost, ...posts]);
//       setNewPost("");
//     } catch (error) {
//       console.error("Error adding post:", error);
//     }
//   };

//   // Handle Reply Submission
//   const addReply = async (postId) => {
//     const replyText = replyInputs[postId]?.trim();
//     if (!replyText) return;

//     try {
//       const response = await fetch(`http://localhost:3000/api/replies/${postId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: replyText, username }),
//       });

//       if (!response.ok) throw new Error("Failed to add reply");

//       const updatedPost = await response.json();
//       setPosts(posts.map(post => (post._id === postId ? updatedPost : post)));
//       setReplyInputs({ ...replyInputs, [postId]: "" }); // Clear reply input
//     } catch (error) {
//       console.error("Error adding reply:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Community Forum</h1>

//       {/* Post Input Box */}
//       <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-md mb-4">
//         <textarea
//           className="w-full border p-2 rounded-md"
//           rows="3"
//           placeholder="Share your thoughts..."
//           value={newPost}
//           onChange={(e) => setNewPost(e.target.value)}
//         ></textarea>
//         <button
//           onClick={addPost}
//           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Post
//         </button>
//       </div>

//       {/* Display Posts */}
//       <div className="max-w-3xl mx-auto">
//         {posts.map((post, index) => (
//           <div key={post._id || `post-${index}`} className="bg-white p-4 mb-4 rounded-lg shadow-md">
//             <p className="text-lg">{post.content}</p>
//             <p>
//               <strong>Posted by:</strong> {post.username || "Anonymous"}
//             </p>
//             <p className="text-gray-500 text-sm">
//               Posted on: {post.timestamp ? new Date(post.timestamp).toLocaleString() : "Unknown"}
//             </p>

//             {/* Reply Input */}
//             <div className="mt-2">
//               <textarea
//                 className="w-full border p-2 rounded-md"
//                 rows="2"
//                 placeholder="Write a reply..."
//                 value={replyInputs[post._id] || ""}
//                 onChange={(e) => setReplyInputs({ ...replyInputs, [post._id]: e.target.value })}
//               ></textarea>
//               <button
//                 onClick={() => addReply(post._id)}
//                 className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
//               >
//                 Reply
//               </button>
//             </div>

//             {/* Display Replies */}
//             <div className="mt-4 pl-6 border-l-2 border-gray-300">
//               {post.replies && post.replies.length > 0 ? (
//                 post.replies.map((reply, replyIndex) => (
//                   <div key={`reply-${replyIndex}`} className="bg-gray-100 p-2 rounded-md mb-2">
//                     <p>{reply.content}</p>
//                     <p className="text-sm text-gray-500">
//                       <strong>Replied by:</strong> {reply.username || "Anonymous"} |{" "}
//                       {reply.timestamp ? new Date(reply.timestamp).toLocaleString() : "Unknown"}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-500">No replies yet.</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Community;
//correct123
// import { useState, useEffect } from "react";

// const Community = () => {
//   const [posts, setPosts] = useState([]); // Store posts
//   const [newPost, setNewPost] = useState(""); // Store new post content
//   const [username, setUsername] = useState("Anonymous"); // Default username
//   const [replyInputs, setReplyInputs] = useState({}); // Store reply inputs per post
//   const [showMyPosts, setShowMyPosts] = useState(false);

//   // Fetch user info from localStorage on component mount
//   useEffect(() => {
//     const userInfoRaw = localStorage.getItem("userInfo");

//     try {
//       const userInfo = userInfoRaw ? JSON.parse(userInfoRaw) : null;
//       if (userInfo && userInfo.name) {
//         setUsername(userInfo.name);
//       }
//     } catch (error) {
//       console.error("Error parsing userInfo:", error);
//     }
//   }, []);

//   // Fetch all posts from API
//   useEffect(() => {
//     fetch("http://localhost:3000/api/getposts")
//       .then((response) => response.json())
//       .then((data) => setPosts(data))
//       .catch((error) => console.error("Error fetching posts:", error));
//   }, []);

//   // Add a new post
//   const addPost = async () => {
//     if (!newPost.trim()) return;

//     try {
//       const response = await fetch("http://localhost:3000/api/posts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: newPost, username }),
//       });

//       if (!response.ok) throw new Error("Failed to add post");

//       const addedPost = await response.json();
//       setPosts([addedPost, ...posts]); // Add new post to the beginning
//       setNewPost(""); // Clear input field
//     } catch (error) {
//       console.error("Error adding post:", error);
//     }
//   };

//   // Handle reply submission
//   const addReply = async (postId) => {
//     const replyText = replyInputs[postId]?.trim();
//     if (!replyText) return;

//     try {
//       const response = await fetch(`http://localhost:3000/api/replies/${postId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: replyText, username }),
//       });

//       if (!response.ok) throw new Error("Failed to add reply");

//       const updatedPost = await response.json();

//       // Update the specific post in the state
//       setPosts(posts.map(post => (post._id === postId ? updatedPost : post)));

//       // Clear the reply input for the post
//       setReplyInputs({ ...replyInputs, [postId]: "" });
//     } catch (error) {
//       console.error("Error adding reply:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Community Forum</h1>

//       {/* Post Input Box */}
//       <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-md mb-4">
//         <textarea
//           className="w-full border p-2 rounded-md"
//           rows="3"
//           placeholder="Share your thoughts..."
//           value={newPost}
//           onChange={(e) => setNewPost(e.target.value)}
//         ></textarea>
//         <button
//           onClick={addPost}
//           className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Post
//         </button>
//       </div>

//       {/* Display Posts */}
//       <div className="max-w-3xl mx-auto">
//         {posts.map((post) => (
//           <div key={post._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
//             <p className="text-lg">{post.content}</p>
//             <p><strong>Posted by:</strong> {post.username || "Anonymous"}</p>
//             <p className="text-gray-500 text-sm">
//               Posted on: {post.timestamp ? new Date(post.timestamp).toLocaleString() : "Unknown"}
//             </p>

//             {/* Reply Input */}
//             <div className="mt-2">
//               <textarea
//                 className="w-full border p-2 rounded-md"
//                 rows="2"
//                 placeholder="Write a reply..."
//                 value={replyInputs[post._id] || ""}
//                 onChange={(e) => setReplyInputs({ ...replyInputs, [post._id]: e.target.value })}
//               ></textarea>
//               <button
//                 onClick={() => addReply(post._id)}
//                 className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
//               >
//                 Reply
//               </button>
//             </div>

//             {/* Display Replies */}
//             <div className="mt-4 pl-6 border-l-2 border-gray-300">
//               {post.replies && post.replies.length > 0 ? (
//                 post.replies.map((reply, index) => (
//                   <div key={reply._id} className="bg-gray-100 p-2 rounded-md mb-2">
//                     <p>{reply.content}</p>
//                     <p className="text-sm text-gray-500">
//                       <strong>Replied by:</strong> {reply.username || "Anonymous"} |{" "}
//                       {reply.timestamp ? new Date(reply.timestamp).toLocaleString() : "Unknown"}
//                     </p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-500">No replies yet.</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Community;

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
const Community = () => {
  const [posts, setPosts] = useState([]); // Store all posts
  const [newPost, setNewPost] = useState(""); // Store new post content
  const [username, setUsername] = useState("Anonymous"); // Default username
  const [replyInputs, setReplyInputs] = useState({}); // Store reply inputs
  const [showMyPosts, setShowMyPosts] = useState(false); // Toggle for "My Posts" view

  // Fetch user info from localStorage on component mount
  useEffect(() => {
    const userInfoRaw = localStorage.getItem("userInfo");

    try {
      const userInfo = userInfoRaw ? JSON.parse(userInfoRaw) : null;
      if (userInfo && userInfo.name) {
        setUsername(userInfo.name);
      }
    } catch (error) {
      console.error("Error parsing userInfo:", error);
    }
  }, []);

  // Fetch all posts from API
  useEffect(() => {
    fetch("http://localhost:3000/api/getposts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Add a new post
  const addPost = async () => {
    if (!newPost.trim()) return;

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newPost, username }),
      });

      if (!response.ok) throw new Error("Failed to add post");

      const addedPost = await response.json();
      setPosts([addedPost, ...posts]); // Add new post at the top
      setNewPost(""); // Clear input field
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // Add a reply to a post
  const addReply = async (postId) => {
    const replyText = replyInputs[postId]?.trim();
    if (!replyText) return;

    try {
      const response = await fetch(`http://localhost:3000/api/replies/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyText, username }),
      });

      if (!response.ok) throw new Error("Failed to add reply");

      const updatedPost = await response.json();
      setPosts(posts.map(post => (post._id === postId ? updatedPost : post))); // Update post with new reply
      setReplyInputs({ ...replyInputs, [postId]: "" }); // Clear reply input field
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  // Filter posts based on "My Posts" toggle
  const filteredPosts = showMyPosts
    ? posts.filter(post => post.username === username)
    : posts;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
        <Navbar></Navbar>
      <h1 className="text-3xl font-bold text-center mb-6">Community Forum</h1>

      {/* Toggle Buttons */}
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
          My Posts
        </button>
      </div>

      {/* Post Input Box */}
      <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-md mb-4">
        <textarea
          className="w-full border p-2 rounded-md"
          rows="3"
          placeholder="Share your thoughts..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>
        <button
          onClick={addPost}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </div>

      {/* Display Posts */}
      <div className="max-w-3xl mx-auto">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <div key={post._id || `post-${index}`} className="bg-white p-4 mb-4 rounded-lg shadow-md">
              <p className="text-lg">{post.content}</p>
              <p>
                <strong>Posted by:</strong> {post.username || "Anonymous"}
              </p>
              <p className="text-gray-500 text-sm">
                Posted on: {post.timestamp ? new Date(post.timestamp).toLocaleString() : "Unknown"}
              </p>

              {/* Reply Input */}
              <div className="mt-2">
                <textarea
                  className="w-full border p-2 rounded-md"
                  rows="2"
                  placeholder="Write a reply..."
                  value={replyInputs[post._id] || ""}
                  onChange={(e) => setReplyInputs({ ...replyInputs, [post._id]: e.target.value })}
                ></textarea>
                <button
                  onClick={() => addReply(post._id)}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Reply
                </button>
              </div>

              {/* Display Replies (Only for My Posts) */}
              {showMyPosts && (
                <div className="mt-4 pl-6 border-l-2 border-gray-300">
                  {post.replies && post.replies.length > 0 ? (
                    post.replies.map((reply, replyIndex) => (
                      <div key={`reply-${replyIndex}`} className="bg-gray-100 p-2 rounded-md mb-2">
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
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Community;
