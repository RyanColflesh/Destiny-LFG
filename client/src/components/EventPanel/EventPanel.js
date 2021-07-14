import React from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import './EventPanel.css'

//Fetches all event data and returns a list of EventPanels
const EventList = () => {
    let [data, setData] = useState(null);
    
    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
        .then(
            result => {
                console.log(result.data);
                setData(result.data.map(event => {
                    return <EventPanel 
                            key = {event._id} 
                            description = {event.description}
                            tags = {event.tags}
                            submitterID = {event.submitterID}
                            />
                }));
            }
        );    
    }, []);

    return <div>{data}</div>
};

//Component for each event
const EventPanel = ({description, tags, submitterID}) => {
    return (
        <div class="event-panel">
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

export default EventList;