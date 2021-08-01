import './scenes-header.css'

function ScenesHeader({ selectedSceneId, scenes, page }) {
  return (
    <div className='scenes-header'>
      <div className='app-label'>
        <p>App Name</p>
        {
          page === 'SELECT_PREVIEW' ? <p>Select a video frame</p> : null
        }
      </div>
      {
        page === 'SELECT_PREVIEW' ? (<p>{selectedSceneId.length} selected out of {scenes.length} frames</p>) : (<button
          className='save-btn'
          onClick={() => console.log('save video')}
        >
          Save Video
        </button>)
      }
    </div>
  )
}

export default ScenesHeader
