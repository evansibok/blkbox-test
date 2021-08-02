import { useQuery } from 'react-query';
import axios from 'axios';
import { FiPlusCircle, FiRepeat, FiSkipBack, FiSkipForward, FiTrash2 } from 'react-icons/fi';

import './edit-preview.css';


const fetchFrames = async () => {
  const { data } = await axios.get('http://devserver.blkbox.ai/api/studio/creatives/step3');

  return data;
}


function EditPreview() {
  const videoLinks = [];
  let currentVideo = 0;

  const { data: framesRes, isLoading, isError, error } = useQuery('frames', fetchFrames);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  for(let i=0; i < framesRes.data.length; i++){
    videoLinks.push(framesRes.data[i]['url']);
  }

  const playAllVideos = () => {

    const videoPlayer = document.querySelector('.vid-player');
    const lastVideo = videoPlayer.src === videoLinks[videoLinks.length - 1];
    
    // if no next url
    if (lastVideo) {
      // set the video player to the first url
      // end
      videoPlayer.src = videoLinks[0];
    } else {
      // when the active video ends
      // update the new active video index
      currentVideo += 1

      // replace the src attribute with the next url in the array
      videoPlayer.src = videoLinks[currentVideo];
      videoPlayer.play();
    }
  }

  return (
    <div className='edit-con'>
      <div className='video-con'>
        <video src={videoLinks[0]} controls onEnded={playAllVideos} className='vid-player'>
        </video>
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
                    <video src={frame.url} />
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
