import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [posts, setPosts] = useState(null);
    const [feed, setFeed] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <PostContext.Provider value={{ posts, setPosts, feed, setFeed, loading, setLoading }}>
            {children}
        </PostContext.Provider>
    )
}