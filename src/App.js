import { useEffect, useState } from 'react';
import './App.css';

function DrumMachine() {
  const [clipPlayed, setClipPlayed] = useState('');

  function handleClick(hotkey, trackName) {
    setClipPlayed(trackName)
    const playback = document.getElementById(hotkey)
    if (!playback.paused) {
      playback.currentTime = 0;
    } else {
      playback.play()
    }
  }

  function playTrack(hotkey) {
    const playback = document.getElementById(hotkey)
    if (!playback.paused) {
      playback.currentTime = 0;
    } else {
      var playPromise = playback.play()
      if (playPromise !== undefined) {
        playPromise.then( () => {
        }).catch((error) => {
          console.log(error);
          console.log("try to reload")
          playback.load();
          playback.play();
        })
      }
    }
  }

  function getTrack(hotkey) {
    let index = hotkeys.indexOf(hotkey.toUpperCase());
    return getName(tracks[index]);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const pressedKey = e.key.toUpperCase();
      const trackName = getTrack(pressedKey);
      const button = document.getElementById(trackName);
      button.classList.add("active");
      playTrack(pressedKey);
      setClipPlayed(trackName);
    };
    function handleKeyUp(e) {
      const pressedKey = e.key.toUpperCase();
      const trackName = getTrack(pressedKey);
      const button = document.getElementById(trackName);
      button.classList.remove("active");
    }
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);


    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, []);



  return (
    <div id="drum-machine" className="drum-machine" >
      <div className="pads">
        <DrumPad padPressed={handleClick} hotkey={hotkeys[0]} audioclip={tracks[0]} />
        <DrumPad padPressed={handleClick} hotkey={hotkeys[1]} audioclip={tracks[1]} />
        <DrumPad padPressed={handleClick} hotkey={hotkeys[2]} audioclip={tracks[2]} />
        <DrumPad padPressed={handleClick} hotkey={hotkeys[3]} audioclip={tracks[3]} />
        <DrumPad padPressed={handleClick} hotkey={hotkeys[4]} audioclip={tracks[4]} />
        <DrumPad padPressed={handleClick} hotkey={hotkeys[5]} audioclip={tracks[5]} />
        <DrumPad padPressed={handleClick} hotkey={hotkeys[6]} audioclip={tracks[6]} />
        <DrumPad padPressed={handleClick} hotkey={hotkeys[7]} audioclip={tracks[7]} />
        <DrumPad padPressed={handleClick} hotkey={hotkeys[8]} audioclip={tracks[8]} />
      </div>
      <div className="tools">
        <Display clip={clipPlayed} />
      </div>
    </div>
  );
}

function Display({ clip }) {
  return (
    <p id="display">{clip}</p>
  )
}

function DrumPad({ audioclip, hotkey, padPressed}) {
  const audioName = getName(audioclip)

  return (
    <button onClick={() => padPressed(hotkey, audioName)} id={audioName} className="drum-pad">{hotkey}<audio crossOrigin="anonymous" id={hotkey} className="clip" src={audioclip}></audio></button>
  )
}

const hotkeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
const tracks = [
  "./audio/Heater-1.mp3",
  "./audio/Heater-2.mp3",
  "./audio/Heater-3.mp3",
  "./audio/Heater-4_1.mp3",
  "./audio/Heater-6.mp3",
  "./audio/Cev_H2.mp3",
  "./audio/Kick_n_Hat.mp3",
  "./audio/RP4_KICK_1.mp3",
  "./audio/Dsc_Oh.mp3"
]


function getName(audioPath) {
  return audioPath.split('/').pop().slice(0, -4);
  
}

export default DrumMachine;
