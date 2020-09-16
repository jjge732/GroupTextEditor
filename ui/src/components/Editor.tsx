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

  enableTab(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.onkeydown = e => {
          if (e.code === 'Tab') { // tab was pressed
            e.preventDefault();
            //TODO: fix so tab is added in the correct location
            this.setState({html: `${this.state.html}${space.repeat(tabSpaceNbr)}`});
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
  //TODO: fix weirdness in line number
  const element = document.getElementById('editorElement')?.children.length;
  return element || 0 + 1;
}

sanitize(input: string): string {
  return input;
}

render() {
  console.log(this.state.numberLines)
  return (
    <div id='editorContainer' onClick={this.focusLastLine} >
      <span className='lineNumber'>{this.state.numberLines}</span>
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
