/* tslint:disable:typedef */

import * as FontFaceObserver from 'fontfaceobserver';

import { Terminal } from '../../src/Terminal';
import { Box, BoxOptions } from '../../src/widgets/Box';
import { Text, TextOptions } from '../../src/widgets/Text';

interface TestWindow extends Window {
  terminal: Terminal;
}

function hideLoad() {
  const elem = document.getElementById('loading');
  elem.parentElement.removeChild(elem);
}

function run() {
  /* tslint:disable:no-magic-numbers */
  const columns = 40;
  const rows = 20;
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const terminal = new Terminal(canvas, {
    columns,
    rows,
    cursor: false,
  });

  canvas.parentElement.style.width = `${canvas.width}px`;
  canvas.parentElement.style.height = `${canvas.height}px`;

  const options: BoxOptions = {
    col: 1,
    line: 1,
    width: 20,
    height: 5,
  };
  //const b1 = new Box(terminal, options);
  const b1 = terminal.attachWidget(Box, options);

  options.line = 7;
  options.title = 'Title';
  // const b2 = new Box(terminal, options);
  const b2 = terminal.attachWidget(Box, options);
  const box = terminal.getWidget(b2) as Box;
  box.attachWidget(Text, { text: '1 tile margin', textStyle: { fg: '#ffff00' } });

  options.line = 13;
  options.title = 'Very long title for real';
  options.padding = { top: 0, bottom: 0, right: 0, left: 0};
  // const b3 = new Box(terminal, options);
  const b3 = terminal.attachWidget(Box, options);
  const textWidget = new Text(terminal, {
    text: ''
    //  |--------------------| // box size
      + 'This is a long '
      + 'text inside a box '
      + 'with no margins '
      + 'but it doesn\'t fit '
      + 'it all. However, '
      + 'it continues for '
      + 'several lines like '
      + 'this variable is '
      + 'defined.',
    //  |--------------------| // box size
  });
  (terminal.getWidget(b3) as Box).attachWidget(textWidget);

  (window as TestWindow).terminal = terminal;
}

const font = new FontFaceObserver('Terminal_VT220');
font.load()
  .then(hideLoad)
  .then(run);