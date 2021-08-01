import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import './scenes.css';


const fetchScenes = async () => {
  const { data } = await axios.get('http://devserver.blkbox.ai/api/studio/creatives/step2');

  return data;
}


function Scenes() {
  const [selectedSceneId, setSelectedSceneId] = useState([]);
  const [selectedScene, setSelectedScene] = useState([]);

  const { data, isLoading, isError, error } = useQuery('scenes', fetchScenes);

  const selectScene = (scene) => {
    const selTag = document.querySelector(`[id=${CSS.escape(scene.id)}]`);

    if(selectedScene.length > 0){
      // if there's a currently selected scene
      // get the old selected element by its Id
      const oldSceneId = selectedSceneId[0];
      const oldElement = document.querySelector(`[id=${CSS.escape(oldSceneId)}]`);
      // remove the selected-tag from the old selected element
      oldElement.classList.remove('selected-tag');

      // then
      // replace the current selected Scene Id
      setSelectedSceneId([scene.id]);
      // replace the current scene
      setSelectedScene([scene]);
      // add the selected tag to the current element
      selTag.classList.toggle('selected-tag');

    } else {
      setSelectedSceneId([scene.id]);
      setSelectedScene([scene]);
      selTag.classList.toggle('selected-tag');
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }


  return (
    <div className='scenes-con'>
      {/* Scenes header */}
      <div className='scenes-header'>
        <div>
          <p>App Name</p>
          <p>Select a video frame</p>
        </div>
        <p>{selectedSceneId.length} selected out of {data.data.length} frames</p>
      </div>

      {/* Scenes container */}
      <div className='frames-con'>
        {data.data.map((scene, idx) => {
          const sceneId = `${scene.url}-${idx}`;
          const newScene = { ...scene, id: sceneId}

          return (
            <div
              key={sceneId}
              className='scene'
              onClick={() => selectScene(newScene)}
            >
              <video src={newScene.url} />
              <div id={newScene.id} className='selected-con'>
                <p>✔</p>
                <p>Selected</p>
              </div>
            </div>
          )
        })
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
