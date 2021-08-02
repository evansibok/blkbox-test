import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FiPlusCircle, FiRepeat, FiSkipBack, FiSkipForward, FiTrash2 } from 'react-icons/fi';

import './edit-preview.css';


const fetchFrames = async () => {
  const { data } = await axios.get('https://devserver.blkbox.ai/api/studio/creatives/step3');

  return data;
}


function EditPreview() {
  const [videoLinks, setVideoLinks] = useState([]);
  let oldVideoIndex = 0;
  let currentVideoIndex = 0;

  const { data: framesRes, isLoading, isError, error } = useQuery('frames', fetchFrames);

  useEffect(() => {
    if(framesRes){
      setVideoLinks(framesRes.data.map(frame => frame.url));
    }
  }, [framesRes])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  const onVidPlay = () => {
    if(oldVideoIndex === currentVideoIndex) {
      // add .active-vid class currentVideoElement (src === currentVideo)
      let currentVideoElement = document.querySelector(`.frame-parent video[src=${CSS.escape(videoLinks[currentVideoIndex])}]`);
      currentVideoElement.parentElement.classList.add('active-vid')
    } else {
      let oldVideoElement = document.querySelector(`.frame-parent video[src=${CSS.escape(videoLinks[oldVideoIndex])}]`);
      oldVideoElement.parentElement.classList.toggle('active-vid');
      
      // add .active-vid class currentVideoElement (src === currentVideo)
      let currentVideoElement = document.querySelector(`.frame-parent video[src=${CSS.escape(videoLinks[currentVideoIndex])}]`);
      currentVideoElement.parentElement.classList.add('active-vid')
    }
  }

  const playAllVideos = () => {
    const videoPlayer = document.querySelector('.vid-player');
    const lastVideo = videoPlayer.src === videoLinks[videoLinks.length - 1];


    // if no next url
    if (lastVideo) {
      
      let oldVideoElement = document.querySelector(`.frame-parent video[src=${CSS.escape(videoLinks[currentVideoIndex])}]`);
      oldVideoElement.parentElement.classList.toggle('active-vid');

      // set the video player to the first url
      // end
      oldVideoIndex = 0;
      videoPlayer.src = videoLinks[oldVideoIndex];
      currentVideoIndex = 0;

      let currentVideoElement = document.querySelector(`.frame-parent video[src=${CSS.escape(videoLinks[currentVideoIndex])}]`);
      currentVideoElement.parentElement.classList.add('active-vid')
    } else {
      // when the active video ends
      // update the new active video index
      oldVideoIndex = currentVideoIndex
      currentVideoIndex += 1

      // replace the src attribute with the next url in the array
      videoPlayer.src = videoLinks[currentVideoIndex];
      videoPlayer.play();
    }
  }

  return (
    <div className='edit-con'>
      <div className='video-con'>
        <video
          src={videoLinks[currentVideoIndex]}
          onPlay={onVidPlay}
          onEnded={playAllVideos}
          className='vid-player'
          controls
        />
      </div>

      <div className='editor-sect'>
        <div className='time-sect'>
          <p>Total time</p>
          <p>00:00:06</p>
        </div>

        <div className='controls-sect'>
          <FiPlusCircle color='#FFF' size={16} />
          <FiRepeat color='#FFF' size={16} />
          <FiSkipBack color='#FFF' size={16} />
          <FiSkipForward color='#FFF' size={16} />
          <FiTrash2 color='#FFF' size={16} />
        </div>

        <div className='frames-sect'>
          <div className='play-tracker'>
            <div className='tracker-head' />
            <div className='tracker-line' />
          </div>
          <div className='frames-body'>
            {
              framesRes.data.map(frame => (
                <div
                  key={frame.position} 
                  className='frame-container'
                >
                  <div className='frame-parent'>
                    <video src={frame.url} id='vid' />
                  </div>
                  <label>{frame.name}</label>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default EditPreview;
