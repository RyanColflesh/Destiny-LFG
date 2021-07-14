import './App.css';
import EventList from './components/EventPanel/EventPanel.js';
import CreatePost from './components/CreatePost/CreatePost.js'

function App() {
  return (
    <div className="container">
      <div className="header">
        
      </div>
      <div className="search">
        <CreatePost/>
      </div>
      <div className="activities">
        <EventList />
      </div>
    </div>
  );
}

export default App;
