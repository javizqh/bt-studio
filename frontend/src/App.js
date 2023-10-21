// App.js
import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import HeaderMenu from './components/header_menu/HeaderMenu';
import FileBrowser from './components/file_browser/FileBrowser';
import FileEditor from './components/file_editor/FileEditor';
import DiagramEditor from './components/diagram_editor/DiagramEditor';
import './App.css';

const App = () => {

  const [editorWidth, setEditorWidth] = useState(700);
  const [currentFilename, setCurrentFilename] = useState('');

  const onResize = (key, size) => {
    switch (key) {
      case 'editorWidth':
        setEditorWidth(size.width);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">

      <HeaderMenu />

      <div className="App-main" style={{ display: 'flex' }}>

        <div>
          <FileBrowser setCurrentFilename = {setCurrentFilename} />
        </div>
        
        <Resizable
          width={editorWidth}
          height={0}
          onResize={(e, { size }) => onResize('editorWidth', size)}
          minConstraints={[400, 400]}
          maxConstraints={[900, 900]}
        >
          <div style={{ width: `${editorWidth}px` }}>
            <FileEditor currentFilename = {currentFilename} />
          </div>
        </Resizable>

        <div style={{ flex: 1}}>
          <DiagramEditor />
        </div>
        
      </div>

    </div>
  );
};

export default App;
