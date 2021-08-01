import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import ScenesHeader from '../../components/ScenesHeader/ScenesHeader';
import SelectPreview from '../SelectPreview/SelectPreview';
import EditPreview from '../EditPreview/EditPreview';

import './editor.css';

const fetchScenes = async () => {
  const { data } = await axios.get('http://devserver.blkbox.ai/api/studio/creatives/step2');

  return data;
}


function Editor() {
  const [selectedSceneId, setSelectedSceneId] = useState([]);
  const [selectedScene, setSelectedScene] = useState([]);
  const [page, setPage] = useState('SELECT_PREVIEW');

  const { data, isLoading, isError, error } = useQuery('scenes', fetchScenes);

  const selectScene = (scene) => {
    const selTag = document.querySelector(`[id=${CSS.escape(scene.id)}]`);

    if (selectedScene.length > 0) {
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

  const goToNext = () => {
    setPage('EDIT_PREVIEW');
  }
  const goToPrev = () => {
    setPage('SELECT_PREVIEW');
  }

  const renderContent = () => {
    switch (page) {
      case 'SELECT_PREVIEW':
        return <SelectPreview
          scenes={data.data}
          selectScene={selectScene}
          goToNext={goToNext}
        />
      case 'EDIT_PREVIEW':
        return <EditPreview
          scene={selectedScene}
          goToNext={goToPrev}
        />
      default:
        return <p>Loading...</p>
    } 
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className='editor-con'>
      <ScenesHeader
        selectedSceneId={selectedSceneId}
        scenes={data.data}
        page={page}
      />

      {renderContent()}

      <div className='page-btn'>
        <button
          className='page-move-btn'
          onClick={page === 'SELECT_PREVIEW' ? goToNext : goToPrev}
        >
          {page === 'SELECT_PREVIEW' ? 'Next' : 'Prev'}
        </button>
      </div>
    </div>
  )
}

export default Editor;
