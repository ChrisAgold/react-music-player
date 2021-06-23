import React, {useState,useRef} from "react";
import Player from './components/Player';
import Song from './components/Song';
import './styles/app.scss';
import data from './data';
import Library from './components/Library'

function App() {
    // Ref
    const audioRef = useRef(null);
    // State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration: duration})
    }

    return (
        <div className="App">
            <Song currentSong={currentSong}/>
            <Player
                audioRef={audioRef}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                currentSong={currentSong}
                setSongInfo={setSongInfo}
                songInfo={songInfo}
            />
            <Library  songs={songs} setCurrentSong={setCurrentSong}/>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
            />
        </div>
    );
}

export default App;




