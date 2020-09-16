import React from 'react';
import ContentEditable from 'react-contenteditable'

import API from '../api';
 
function Editor() {
  const text = React.useRef('');

  const handleChange = (evt: any) => {
    text.current = evt.target.value;
  };
 
  const handleBlur = () => {
    console.log(text.current);
  };

  return (
    <div id='editorContainer'>
      <ContentEditable html={text.current} onBlur={handleBlur} onChange={handleChange} />
    </div>
  )
}

export default Editor;
