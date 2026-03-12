import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
})

const getPosts = async () => {
    try {
        const response = await api.get("/posts/feed");
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

const createPost = async (imageFile, caption) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append('caption', caption);

    const resonse = await api.post("/posts", formData);

    return resonse.data;
}

const likePost = async (postID) => {
    const response = await api.post("/posts/like/" + postID);
    return response.data;
}

const unLikePost = async (postID) => {
    const response = await api.post("/posts/unLike/" + postID);
    return response.data;
}

export { getPosts, createPost, likePost, unLikePost };