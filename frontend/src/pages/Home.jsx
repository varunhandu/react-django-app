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
            if (res.status === 204) alert('Deleted!')
            else ('Failed to delete')
           })
           .catch((err) => alert('error deleting tweet : ' + err))
        getTweets()
    };

    const createTweet = (e) => {
        e.preventDefault()
        api.post('/tweet/', { title, content })
           .then((res) => {
            if (res.status === 201) alert('Created!')
            else ('Failed to create')
           })
           .catch((err) => alert('error creating tweet : ' + err))
        getTweets()
    };

    return (
        <div>
        <div>
            <h2>Tweet something!</h2>
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
            {tweets.map((tweet) => (
                <Tweet tweet={tweet} onDelete={deleteTweet} key={tweet.id}/>
            ))}
        </div>
        </div>);
}

export default Home