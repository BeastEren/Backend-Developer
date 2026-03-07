import { useContext } from "react";
import { PostContext } from "../post.context";
import { getPosts } from "../services/post.api";

export function usePost() {
    const context = useContext(PostContext);
    const { posts, setPosts, feed, setFeed, loading, setLoading } = context;

    const handleGetFeed = async () => {
        setLoading(true);
        try {
            const res = await getPosts();
            setFeed(res.getFeed);
        } catch (error) {
            console.error("Error fetching feed:", error);
        }
        finally {
            setLoading(false);
        }
    }

    return { posts, feed, loading, handleGetFeed };
}