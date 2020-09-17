import React, { ChangeEvent } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import API from '../api';

const space = '\u00A0'; // the character used ot add whitespace in HTML
const tabSpaceNbr = 2;
 
class Editor extends React.Component {
  contentEditable: any
  state: {
    html: string,
    numberLines: number
  }
  constructor(props: object) {
    super(props);
    this.contentEditable = React.createRef();
    this.state = {
      html: '<div><br></div>',
      numberLines: 1
    };
  }

  getCursorPosition(element: Element): number {
    const positionRange = document.createRange();
    const selection = window.getSelection();
    if (selection) {
      console.log(document.activeElement)
      const elementText = element.textContent;
      console.log(elementText)
      const lineNumber = 1;
      const lineOffset = selection?.focusOffset;
      positionRange.setStart(element, lineNumber); 
      positionRange.collapse(true); 
      selection.removeAllRanges();
      selection.addRange(positionRange); 
    } else {
      console.log('There is not currently a selection on the window');
    }
    return 0;
  }

  getArrayOfLines(): Array<string> {
    const textArr = this.state.html.replace(/<\/div>|<br>/g, '').split('<div>');
    textArr.shift();
    return textArr;
  }

  enableTab(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.onkeydown = event => {
          if (event.code === 'Tab') { // tab was pressed
            event.preventDefault();
            this.getCursorPosition(element)
            //TODO: fix so tab is added in the correct location
            console.log(this.state.html)
            // this.setState({html: `${this.state.html}${space.repeat(tabSpaceNbr)}`});
          }
      };
    }
}

componentDidMount() {
  this.enableTab('editorElement');
}

focusLastLine(): void {
  // obtains the last child element and casts it to an HTMLElement
  const htmlElement = document.getElementById('editorContainer')?.lastElementChild as HTMLElement;
  if (htmlElement) {
    htmlElement.focus()
  }
}

getNumberOfLines(): number {
  const element = document.getElementById('editorElement')?.children.length;
  return element || 0 + 1;
}

generateLineNumbers(): Array<Element> {
  const { numberLines } = this.state
  const lineArray = new Array(numberLines);
  for (let i = 0; i < numberLines; i++) {
    lineArray[i] = <div className='lineNumber'>{i + 1}</div>;
  }
  return lineArray;
}

sanitize(input: string): string {
  return input;
}

render() {
  return (
    <div id='editorContainer' onClick={this.focusLastLine} >
      <span id='lineNumberContainer'>{this.generateLineNumbers()}</span>
      <ContentEditable 
        id='editorElement' 
        innerRef={this.contentEditable} 
        html={this.state.html} 
        onChange={(evt: ContentEditableEvent) => this.setState({
          html: this.sanitize(evt.target.value),
          numberLines: this.getNumberOfLines()
        })} 
      />
    </div>
  )
}
}

export default Editor;
