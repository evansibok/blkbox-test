import './edit-preview.css';

function EditPreview({ scene }) {
  const newScene = scene[0];
  console.log('scene', scene)
  return (
    <div className='edit-con'>
      <div className='video-con'>
        <video src={newScene.url} controls/>
      </div>

      <div className='editor-sect'>

      </div>
    </div>
  )
}

export default EditPreview;
