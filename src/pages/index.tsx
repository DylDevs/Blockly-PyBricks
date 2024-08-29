import React from 'react';
import BlocklyComponent, { Category, Block } from '@/components/Blockly/Main';
import * as Blockly from 'blockly/core';
import 'blockly/python';
import '@/components/customblocks';
import '@/components/Blockly/generator/generator';
import { Menubar } from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';

// @ts-ignore
const darkTheme = Blockly.Theme.defineTheme('dark', {
  'blockStyles': {
    'colour_blocks': {
      'colourPrimary': '#a5745b',
      'colourSecondary': '#dbc7bd',
      'colourTertiary': '#845d49'
    },
    'list_blocks': {
      'colourPrimary': '#745ba5',
      'colourSecondary': '#c7bddb',
      'colourTertiary': '#5d4984'
    },
    'logic_blocks': {
      'colourPrimary': '#5b80a5',
      'colourSecondary': '#bdccdb',
      'colourTertiary': '#496684'
    },
    'loop_blocks': {
      'colourPrimary': '#5ba55b',
      'colourSecondary': '#bddbbd',
      'colourTertiary': '#498449'
    },
    'math_blocks': {
      'colourPrimary': '#5b67a5',
      'colourSecondary': '#bdc2db',
      'colourTertiary': '#495284'
    },
    'procedure_blocks': {
      'colourPrimary': '#995ba5',
      'colourSecondary': '#d6bddb',
      'colourTertiary': '#7a4984'
    },
    'text_blocks': {
      'colourPrimary': '#5ba58c',
      'colourSecondary': '#bddbd1',
      'colourTertiary': '#498470'
    },
    'variable_blocks': {
      'colourPrimary': '#a55b99',
      'colourSecondary': '#dbbdd6',
      'colourTertiary': '#84497a'
    },
    'variable_dynamic_blocks': {
      'colourPrimary': '#a55b99',
      'colourSecondary': '#dbbdd6',
      'colourTertiary': '#84497a'
    },
    'hat_blocks': {
      'colourPrimary': '#a55b99',
      'colourSecondary': '#dbbdd6',
      'colourTertiary': '#84497a',
      'hat': 'cap'
    }
  },
  'categoryStyles': {
    'colour_category': {
      'colour': '#a5745b'
    },
    'list_category': {
      'colour': '#745ba5'
    },
    'logic_category': {
      'colour': '#5b80a5'
    },
    'loop_category': {
      'colour': '#5ba55b'
    },
    'math_category': {
      'colour': '#5b67a5'
    },
    'procedure_category': {
      'colour': '#995ba5'
    },
    'text_category': {
      'colour': '#5ba58c'
    },
    'variable_category': {
      'colour': '#a55b99'
    },
    'variable_dynamic_category': {
      'colour': '#a55b99'
    }
  },
  'componentStyles': {
    'workspaceBackgroundColour': '#333',
    'toolboxBackgroundColour': '#2a2a2a',
    'toolboxForegroundColour': '#fff',
    'flyoutBackgroundColour': '#252526',
    'flyoutForegroundColour': '#ccc',
    'flyoutOpacity': 1,
    'scrollbarColour': '#797979',
    'insertionMarkerColour': '#fff',
    'insertionMarkerOpacity': 0.3,
    'markerColour': '#fff',
    'cursorColour': '#d0d0d0'
  },
  'fontStyle': {
    'family': 'Roboto Mono',
    'weight': 'bold',
    'size': 12
  },
  'startHats': true
});

function BlocklyMenubar({ workspaceRef } : any) {
  const handleNewFile = () => {0
    if (workspaceRef.current) {
      // Clear the workspace
      workspaceRef.current.workspace.clear();
    }
  };

  const handleLoadFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xml';
    fileInput.onchange = (event : any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e : any) => {
          const xmlText = e.target.result;
          // @ts-ignore
          const xml = Blockly.Xml.textToDom(xmlText);
          if (workspaceRef.current) {
            Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspaceRef.current.workspace);
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  const handleSaveFile = () => {
    if (workspaceRef.current) {
      const xml = Blockly.Xml.workspaceToDom(workspaceRef.current.workspace);
      const xmlText = Blockly.Xml.domToPrettyText(xml);
      const blob = new Blob([xmlText], { type: 'text/xml' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'workspace.xml';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className='BlocklyMenubar'>
      <Menubar className='bg-toolbar-bg h-full rounded-none'>
        <Button onClick={handleNewFile} className='bg-transparent hover:bg-toolbar-button-bg text-white'>New File</Button>
        <Button onClick={handleLoadFile} className='bg-transparent hover:bg-toolbar-button-bg text-white'>Load File</Button>
        <Button onClick={handleSaveFile} className='bg-transparent hover:bg-toolbar-button-bg text-white'>Save File</Button>
        <Button className='bg-transparent hover:bg-toolbar-button-bg text-white'>Run Code</Button>
      </Menubar>
    </div>
  );
}

function App() {
  const workspaceRef = React.useRef(null);

  const generatePythonCode = () => {
    if (workspaceRef.current) {
      // @ts-ignore
      const code = Blockly.Python.workspaceToCode(workspaceRef.current.workspace as Blockly.Workspace);
      downloadPythonFile(code, 'code.py');
    }
  };

  const downloadPythonFile = (code, filename) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="">
      <div className="App">
        <BlocklyMenubar workspaceRef={workspaceRef} />
        {/* @ts-ignore */}
        <BlocklyComponent
          ref={workspaceRef}
          readOnly={false}
          trashcan={true}
          media={'/media/'}
          move={{
            scrollbars: true,
            drag: true,
            wheel: true,
          }}
          theme={darkTheme}
        >
          <Category name="Motors" colour="#0772c0">
            <Block type="motor_initialize"></Block>
            <Block type="motor_run"></Block>
            <Block type="motor_run_rotations"></Block>
          </Category>
          <Category name="Movement" colour="#9f006f">
          </Category>
          <Category name="Light" colour="#320887">
          </Category>
          <Category name="Sound" colour="#610e8c">
          </Category>
          <Category name="Events" colour="#c4a005">
          </Category>
          <Category name="Control" colour="#946100">
          </Category>
          <Category name="Sensors" colour="#1188a8">
          </Category>
          <Category name="Operators" colour="#01933f">
          </Category>
          <Category name="Logic" colour="#b85e00">
          </Category>
          <Category name="Math" colour="#920302">
          </Category>
        </BlocklyComponent>
      </div>
    </div>
  );
}

export default App;
