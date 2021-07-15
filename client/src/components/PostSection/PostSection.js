import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import '../../App.css';
import './CreatePost.css';
import './EventPanel.css';

//Component that holds all active posts, search, and the create post form
const PostSection = () => {
    const [reload, setReload] = useState(false);
    const [query, setQuery] = useState('');

    const handleReload = () => {
        setReload(!reload);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        setQuery(event.target.value);
    }
    
    return (
      <>
        <div className="search">
            <span>
                <SearchBar handleSearch = {handleSearch}/>
                <CreatePost handleReload = {handleReload}/>
            </span>
        </div>
        <div className="activities">
            <EventList reload = {reload} query= {query}/>
        </div>
      </>
    );
}

//Button to open CreatePost form
const CreatePost = ({handleReload}) => {
    const [trigger, setTrigger] = useState(false);

    const handleClick = () => {
        setTrigger(!trigger);
    }


    const handleCreate = () => {
        handleReload();
    }

    return (
        <>
            <button className="button" onClick = {handleClick}>Create Post</button>
            <CreatePostForm trigger = {trigger} 
                            handleClick = {handleClick} 
                            handleCreate = {handleCreate}/>
        </>
    );
}

//Form for creating posts
const CreatePostForm = ({trigger, handleClick, handleCreate}) => {
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
        handleClick();
        handleCreate();
    }

    return (trigger) ? (
        <div className="form-div">
            <form className="form" onSubmit = {handleSubmit}>
                <input className="input"
                        name="description-input" 
                        type="text" 
                        value={description}
                        placeholder="Description"
                        onChange={handleDescriptionChange} />
                <textarea className="input"
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

//Fetches all event data and returns a list of EventPanels
const EventList = ({reload, query}) => {
    let [data, setData] = useState(null);
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
        .then(
            result => {
                console.log(result.data);
                setData(result.data.map(event => {
                        if(event.description.toLowerCase().includes(query.toLowerCase())) {
                            return <EventPanel 
                            key = {event._id} 
                            description = {event.description}
                            tags = {event.tags}
                            submitterID = {event.submitterID}
                            />
                        }
                        return '';
                }));
            }
        );    
    }, [reload, query]);

    return <div>{data}</div>
};

//Component for each event
const EventPanel = ({description, tags, submitterID}) => {
    return (
        <div className="event-panel">
            <h1>{description}</h1>
            <ul>
                {tags.map(tag => (
                <li key={tag}>{tag}</li>
                ))}
            </ul>
            <p>{submitterID}</p>
        </div>
    );
};

const SearchBar = ({handleSearch}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleQuery = (event) => {
        setSearchQuery(event.target.value)
        handleSearch(event);
    }

    return (
        <>
            <form className="search-bar" onSubmit = {handleSearch}>
                <input className="search-input" 
                        type="text" 
                        value={searchQuery}
                        placeholder="Search for events"
                        onChange={handleQuery} />
            </form>
        </>
    );
}

export default PostSection;