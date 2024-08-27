import { BlocklyWorkspace } from 'react-blockly';
import { useState } from 'react';
import { xml } from '../components/block_json';

export default function MyBlocklyEditor() {
  const [xml_toolbox, setXml] = useState<string>(xml.xmlString)

  return (
    <BlocklyWorkspace
      className="w-full" // you can use whatever classes are appropriate for your app's CSS
      workspaceConfiguration={{
        grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
      }}
      initialXml={xml_toolbox}
      onXmlChange={setXml}
    />
  )
}