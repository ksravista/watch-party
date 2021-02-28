import React, { useState, useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReactPlayer from 'react-player'
import io from 'socket.io-client'
import './App.css'


function App() {
  const [play, setPlay] = useState(false);
  const [url, setUrl] = useState('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
  const [sync, setSync] = useState('Sync');
  const socket = io.connect('http://192.168.0.230:4001');

   useEffect(() => {

    socket.on("urlChange", (u) => {
      setUrl(u.url);
    });

    socket.on("message", (p) => {
      setPlay(p.play);
    });
  }, [play, url, sync]);

  // const playPauseClicked = e => {
  //   if(e)
  //     e.preventDefault();

  //   socket.emit('message', { play })
  //   setPlay(!play);
  // }

  const onPlay = () =>{
    socket.emit('message', { play: true });
    setPlay(true);
  }

  const onPause = () =>{
    socket.emit('message', { play: false });
    setPlay(false);
  }

  const urlChange = (e) => {
    socket.emit('urlChange', { url: e.target.value });
    setUrl(e.target.name);
  }

  const synClicked = (e) => {
    e.preventDefault();
    socket.emit('message', { play });
    setSync('You are synced');

  }

  return (
        <div>
          {/* <video width="750" height="500" controls ref={vidRef}>
            <source src= type="video/mp4"/>
          </video> */}

          <ReactPlayer controls 
            playing={play}
            onPlay={onPlay} 
            onPause={onPause}
            url={url}/>
          <Button variant="contained" color="primary" onClick={synClicked}>
            {sync}
          </Button>
          <TextField multiline placeholder= "enter url" type="textarea" onChange={urlChange} value={url}/>

        </div>
        
        

  )
}

export default App
