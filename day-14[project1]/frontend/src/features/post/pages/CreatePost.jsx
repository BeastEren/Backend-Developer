import { useState, useRef } from 'react';
import { usePost } from '../hooks/usePost';
import '../styles/createpost.scss'
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {

    const [caption, setCaption] = useState("");
    const postImageInputFileRef = useRef(null);

    const { loading, handleCreatePost } = usePost();

    const navication = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const file = postImageInputFileRef.current.files[0];

        try {
            await handleCreatePost(file, caption);
        } catch (error) {
            console.log("CreatePostHandelerERROR", error);
            throw error;
        }
        navication('/');
    }

    if (loading) {
        return (<main><h1>creating post</h1></main>)
    }

    return (
        <main className='create-post-page'>
            <div className="form-container">
                <h1>Create Post</h1>
                <form onSubmit={handleSubmit}>
                    <label className='post-image-label' htmlFor="postImage">Select Image</label>
                    <input ref={postImageInputFileRef} hidden type="file" name='postImage' id='postImage' />
                    <input
                        value={caption}
                        onChange={(e) => { setCaption(e.target.value) }}
                        type="text" name='caption' id='caption' placeholder='Enter Caption'
                    />
                    <button className='button primary-button'>Create Post</button>
                </form>
            </div>
        </main>
    )
}
