import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { getPosts, createPost, likePost, unLikePost } from "../services/post.api";

export function usePost() {
    const context = useContext(PostContext);
    const { posts, setPosts, feed, setFeed, loading, setLoading } = context;

    const handleGetFeed = async () => {
        setLoading(true);
        try {
            const data = await getPosts();
            setFeed(data.getFeed);
        } catch (error) {
            console.error("Error fetching feed:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleCreatePost = async (imageFil, caption) => {
        setLoading(true);
        try {
            const data = await createPost(imageFil, caption);
            setFeed([data.post, ...feed]);
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleLike = async (post) => {
        // setLoading(true);
        try {
            const data = await likePost(post);
            await handleGetFeed();
        } catch (error) {
            console.error("Error liking faled:", error);
            throw error;
        }
        finally {
            // setLoading(false);
        }
    }

    const handleUnLike = async (post) => {
        // setLoading(true);
        try {
            const data = await unLikePost(post);
            await handleGetFeed();
        } catch (error) {
            console.error("Error liking faled:", error);
            throw error;
        }
        finally {
            // setLoading(false);
        }
    }

    useEffect(() => {
        handleGetFeed();
    }, [])

    return { posts, feed, loading, handleGetFeed, handleCreatePost, handleLike, handleUnLike };
}