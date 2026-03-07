import { useEffect } from 'react';
import Post from '../components/Post';
import { usePost } from '../hooks/usePost';
import '../styles/feed.scss';
import Nav from '../../../shared/components/nav'

const Feed = () => {
    const { feed, handleGetFeed, loading, handleLike, handleUnLike } = usePost()

    useEffect(() => {
        handleGetFeed()
    }, [])

    if (loading || !feed) {
        return (<main><h1>Feed is loading...</h1></main>)
    }
    return (
        <main className='feed-page' >
            <Nav />
            <div className="feed">
                <div className="posts">
                    {feed.map((post, index) => {
                        return <Post key={index} user={post.user} post={post} loading={loading} handleLike={handleLike} handleUnLike={handleUnLike} />
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed