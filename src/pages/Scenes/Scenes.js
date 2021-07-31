import { useState } from 'react';

import './scenes.css';


function Scenes() {
  const [selected, setSelected] = useState([])
  const [selectedFrames, setSelectedFrames] = useState([])
  


  const selectFrame = (evt, frameId) => {
    const selTag = evt.target.parentElement.children[1];

    // for each frameIds in selected
    // if current frameId is in selected
    if(selected.includes(frameId)){
      // remove the frameId from selected
      const newSelected = selected.filter(item => item !== frameId)
      setSelected(newSelected)
      selTag.classList.remove('selected-tag');

      // remove the frame from selectedFrames
    } else {
      // otherwise add the frameId to selected
      const newFrame = [...selected, frameId]
      setSelected(newFrame)
      selTag.classList.add('selected-tag')
      // remove push the frame to selectedFrames
    }
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
              onClick={(evt) => selectFrame(evt, `${frame}-${idx}`)}
            >
              <img src={frame} alt='' />
              <div className={`selected-con`}>
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
