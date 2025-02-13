import api from "../api"
import Tweet from "../components/Tweet"
import '../styles/Home.css'
import { useState, useEffect } from "react"

function Home() {
    const [tweets, setTweets] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        getTweets()
    }, [])
    const getTweets = () => {
        api.get('/tweet/')
           .then((res) => res.data)
           .then((data) => setTweets(data))
           .catch((err) => alert('error fetching tweets : '+err));
    };

    const deleteTweet = (id) => {
        api.delete(`/tweet/delete/${id}/`)
           .then((res) => {
            if (res.status === 204) getTweets()
            else ('Failed to delete')
           })
           .catch((err) => alert('error deleting tweet : ' + err))
    };

    const createTweet = (e) => {
        e.preventDefault()
        api.post('/tweet/', { title, content })
           .then((res) => {
            if (res.status === 201) getTweets()
            else ('Failed to create')
           })
           .catch((err) => alert('error creating tweet : ' + err))
    };

    const handleLogout = () => {
        localStorage.clear()
        window.location.reload(false);
    };

    return (
        <div className="background-image">
        <div>
            <h2 style={{textAlign : 'center'}}>Tweet something!</h2>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <form onSubmit={createTweet}>
                <h3>What is on your mind</h3>
                <label htmlFor='title'> </label>
                <br/>
                <input
                    type='text'
                    id='title'
                    name='title'
                    placeholder="Tweet something!"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor='content'> </label>
                <br/>
                <textarea
                    type='text'
                    id='content'
                    name='content'
                    placeholder="go into detail..."
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <input type='submit' value='Submit'/>
            </form>
        </div>
        <div>
            <h2>Your Tweets</h2>
            <div style={{display : 'flex', gap : '20px'}}>{tweets.map((tweet) => (
                <Tweet tweet={tweet} onDelete={deleteTweet} key={tweet.id}/>
            ))}</div>
        </div>
        </div>);
}

export default Home