import { useQuery } from 'react-query';
import axios from 'axios';

import './edit-preview.css';

const fetchFrames = async () => {
  const { data } = await axios.get('http://devserver.blkbox.ai/api/studio/creatives/step3');

  return data;
}


function EditPreview() {

  const { data: framesRes, isLoading, isError, error } = useQuery('frames', fetchFrames);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className='edit-con'>
      <div className='video-con'>
        <video controls>
          {framesRes.data.map(frame => (
            <source src={frame.url} type='video/mp4' />
          ))}
        </video>
      </div>

      <div className='editor-sect'>
        <div className='time-sect'>
          <p>Total time</p>
          <p>00:00:06</p>
        </div>

        <div className='controls-sect'>
          <p>io</p>
          <p>io</p>
          <p>io</p>
          <p>io</p>
          <p>io</p>
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
