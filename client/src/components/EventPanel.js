import React from 'react';
import axios from 'axios';
import {useState} from 'react';

const EventList = () => {
    let [output, setOutput] = useState('not showing');
    axios.get('http://localhost:5000/api/events')
    .then(response => {
        setOutput(JSON.stringify(response));
    });

    return <div><p>{output}</p></div>
};

/*const EventPanel = () => {

}; */

export default EventList;