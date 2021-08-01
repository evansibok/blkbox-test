import './scenes.css';


function SelectPreview({ scenes, selectScene }) {

  return (
    <div className='scenes-con'>
      {/* Scenes container */}
      <div className='frames-con'>
        {scenes.map((scene, idx) => {
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
    </div>
  )
}

export default SelectPreview;
