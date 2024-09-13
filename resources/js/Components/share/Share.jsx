import React, { useState } from "react";

const Share = () => {
    const [postContent, setPostContent] = useState("");

    const handlePostSubmit = (e) => {
        e.preventDefault();
        // Handle post submission logic
        console.log("Post Submitted:", postContent);
        setPostContent("");
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-4 mb-4">
                {/* User Avatar */}
                <img
                    src="https://via.placeholder.com/40"  // Replace with actual user avatar
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                />
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    className="w-full bg-gray-100 rounded-full p-2 px-4 text-gray-700"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                />
            </div>

            {/* Divider */}
            <hr className="my-2" />

            <div className="flex justify-between items-center">
                {/* Buttons for adding media, tags, etc. */}
                <div className="flex space-x-4">
                    <button className="flex items-center space-x-1 hover:bg-gray-100 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 5h-2.586l-3-3H9.586L6.586 5H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM4 7h2v12H4V7zm16 12H8V7h3v2h2V7h7v12z"></path>
                        </svg>
                        <span className="text-sm">Photo/Video</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:bg-gray-100 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zM12 14c-2.673 0-8 1.342-8 4v2h16v-2C20 15.342 14.673 14 12 14z"></path>
                        </svg>
                        <span className="text-sm">Tag Friends</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:bg-gray-100 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 4C8.685 4 6 6.685 6 10s2.685 6 6 6 6-2.685 6-6S15.315 4 12 4zM12 14c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4S14.206 14 12 14z"></path>
                            <path d="M12 12h-2V9h2V8h2v1h-2v3z"></path>
                        </svg>
                        <span className="text-sm">Feeling/Activity</span>
                    </button>
                </div>

                {/* Post Button */}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                    onClick={handlePostSubmit}
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default Share;
