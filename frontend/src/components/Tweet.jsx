import React from "react"
import '../styles/Tweet.css'

function Tweet ({tweet, onDelete}) {
    const formatDate = new Date(tweet.time).toLocaleDateString('en-US')

    return (
        <div className="tweet-container">
            <p className="tweet-title">{tweet.title}</p>
            <p className="tweet-content">{tweet.content}</p>
            <p className="tweet-date">{formatDate}</p>
            <button className="delete-btn" onClick={() => onDelete(tweet.id)}>
                Delete</button>
        </div>
    );
}

export default Tweet