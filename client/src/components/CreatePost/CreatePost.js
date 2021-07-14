import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = () => {
    const [trigger, setTrigger] = useState(false);

    const handleClick = () => {
        setTrigger(!trigger);
    }

    return (
        <>
            <button className="button" onClick = {handleClick}>Create Post</button>
            <CreatePostForm trigger = {trigger} />
        </>
    );
}

const CreatePostForm = ({trigger}) => {
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const handleTagsChange = (event) => {
        setTags(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const eventInput = {
            description: description,
            tags: tags,
            submitterID: 'testguy567'
        }

        console.log(eventInput);

        const result = await axios.post('http://localhost:5000/api/events', eventInput);
    }

    return (trigger) ? (
        <div className="form-div">
            <form className="form" onSubmit = {handleSubmit}>
                <input class="input"
                        name="description-input" 
                        type="text" 
                        value={description}
                        placeholder="Description"
                        onChange={handleDescriptionChange} />
                <textarea class="input"
                        name="tags-input"
                        type="text" 
                        value={tags} 
                        placeholder="Tags (separate by commas)"
                        onChange={handleTagsChange} />
                <button type="submit">Create Post</button>
            </form>
        </div>
    ) : "";
}

export default CreatePost;