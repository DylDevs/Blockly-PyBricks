import React from 'react';
import BlocklyComponent, { Block, Value, Field, Shadow, Category } from '@/components/Blockly/Main';
import * as Blockly from 'blockly/core';
import 'blockly/python';
import '@/components/Blockly/blocks/customblocks';
import '@/components/Blockly/generator/generator';

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

function App() {
  const workspaceRef = React.useRef(null);

  const generatePythonCode = () => {
    if (workspaceRef.current) {
      // @ts-ignore
      const code = Blockly.Python.workspaceToCode(workspaceRef.current.workspace as Blockly.Workspace);
      downloadPythonFile(code, 'code.py');
    }
  };

  const downloadPythonFile = (code : any, filename : any) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-screen">
      <div className="App">
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
          theme={darkTheme}  // Applying the dark theme here
        >
          <Category name="Motors" colour="210">
          </Category>
          <Category name="Movement" colour="120">
          </Category>
          <Category name="Light" colour="160">
          </Category>
          <Category name="Sound" colour="330">
          </Category>
          <Category name="Events" colour="120">
          </Category>
          <Category name="Control" colour="160">
          </Category>
          <Category name="Sensors" colour="330">
          </Category>
          <Category name="Operators" colour="120">
          </Category>
          <Category name="Logic" colour="160">
          </Category>
          <Category name="Math" colour="330">
          </Category>
        </BlocklyComponent>
      </div>
    </div>
  );
}

export default App;