import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import * as locale from 'blockly/msg/en';
import 'blockly/blocks';

Blockly.setLocale(locale);

const BlocklyComponent = React.forwardRef((props, ref) => {
  const blocklyDiv = useRef(null);
  const toolbox = useRef(null);
  const primaryWorkspace = useRef(null);

  useEffect(() => {
    const { initialXml, children, ...rest } = props;

    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox.current,
      ...rest,
    });

    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.utils.xml.textToDom(initialXml),
        primaryWorkspace.current
      );
    }
  }, [props]);

  return (
    <>
      <div ref={blocklyDiv} id="blocklyDiv"/>
      <div style={{ display: 'none' }} ref={toolbox}>
        {props.children}
      </div>
    </>
  );
});

export default BlocklyComponent;
