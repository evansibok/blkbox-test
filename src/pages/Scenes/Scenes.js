import { useState } from 'react';

import './scenes.css';


function Scenes() {
  const [selected, setSelected] = useState([]);
  const [selectedFrames, setSelectedFrames] = useState([]);

  
  const selectFrame = (frame) => {
    // for each frameIds in selected
    // for 
    // if current frameId is in selected
    // pop the frameId from selected
    // pop the frame from selectedFrames
    // otherwise push to the frameId to selected
    // and push the frame to selectedFrames
    
  }


  return (
    <div className='scenes-con'>
      {/* Scenes header */}
      <div className='scenes-header'>
        <div>
          <p>App Name</p>
          <p>Select a video frame</p>
        </div>
        <p>{selected.length} selected out of 84 frames</p>
      </div>

      {/* Frames container */}
      <div className='frames-con'>
        {
          ['https://source.unsplash.com/random', 'https://source.unsplash.com/random', 'https://source.unsplash.com/random', 'https://source.unsplash.com/random', 'https://source.unsplash.com/random', 'https://source.unsplash.com/random', 'https://source.unsplash.com/random', 'https://source.unsplash.com/random', 'https://source.unsplash.com/random'].map((frame, idx) => (
            <div
              key={idx}
              className='frame'
              onClick={() => selectFrame(`${frame-idx}`)}
            >
              <img src={frame} alt='' />
              <div className='selected-con selected-tag'>
                <p>✔</p>
                <p>Selected</p>
              </div>
            </div>
          ))
        }
      </div>

      <button
        className='nxt-btn'
        onClick={() => console.log('next')}
      >
        Next
      </button>
    </div>
  )
}

export default Scenes;
