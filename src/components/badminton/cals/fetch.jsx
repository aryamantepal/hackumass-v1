import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const PostExample = () => {
    const { user } = useAuth0();
    const [postData, setPostData] = useState({
        title: '',
        body: '',
        userId: 1, // Assuming a userId
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePostRequest = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Post successful:', data);
        } catch (error) {
            console.error('Error during POST request:', error.message);
        }
    };

    return (
        <div>
            <h1>Post Example</h1>
            <label>
                Title:
                <input type="text" name="title" value={postData.title} onChange={handleInputChange} />
            </label>
            <br />
            <label>
                Body:
                <textarea name="body" value={postData.body} onChange={handleInputChange} />
            </label>
            <br />
            <button onClick={handlePostRequest}>Make POST Request</button>
        </div>
    );
};

export default PostExample;
