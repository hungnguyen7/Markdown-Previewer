import React from 'react';
import './App.css';
import marked from 'marked';

const renderer = new marked.Renderer();
marked.setOptions({
  breaks: true,
});

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      markdown: placeholder,
      editorMaximized: false, //cua so editor se phong to khi co gia tri bang true
      previewMaximized: false
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleEditorMaximize=this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize=this.handlePreviewMaximize.bind(this);
  }
  handleChange(event){ //xu li su kien thay doi text trong editor
    this.setState({
      markdown: event.target.value
    })
  }
  handleEditorMaximize(){
    this.setState({
      editorMaximized: !this.state.editorMaximized
    })
  }
  handlePreviewMaximize(){
    this.setState({
      previewMaximized: !this.state.previewMaximized
    })
  }
  
  render(){
    console.log(this.state.previewMaximized);
    const classes = this.state.editorMaximized ? 
          ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress'] : 
          this.state.previewMaximized ?
          ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress'] :
          ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];
    return(
      <div>
        <div className={classes[0]}>
          <Toolbar icon={classes[2]} onClick={this.handleEditorMaximize} text="Editor"/>
          <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        </div>
        <div className={classes[1]}>
          <Toolbar icon={classes[2]} onClick={this.handlePreviewMaximize} text="Previewer"/>
          <Preview markdown={this.state.markdown}/>
        </div>
      </div>
    ) 
  }
}

const Toolbar=(props)=>{
  return (
    <div className="toolbar">
      <i title="no-stack-dub-sack" className="fa fa-optin-monster"/>
      {props.text}
      <i onClick={props.onClick} className={props.icon}/>
    </div>
  )
}

const Editor=(props)=>{
  return(
    <textarea id="editor" type="text" value={props.markdown} onChange={props.onChange}></textarea>
  )
}

const Preview=(props)=>{
  return(
    <div id="preview" dangerouslySetInnerHTML={{__html:marked(props.markdown, {renderer:renderer})}}>
    </div>
  )
}

const placeholder = `# Hello my name is Hung Nguyen
## Welcome to my Markdown Previewer

[My Github account](https://github.com/hungnguyen7)

I'm a \`coder\`


\`\`\`
// this is multi-line code:

const markdown=(firstLine, lastLine)=>{
  console.log("This is multi-line code");
}
\`\`\`

1. First ordered list item
2. Another item

>Tri nhân giả tri, tự tri khả trí. Thắng nhân giả lực, tự thắng giả cường.

**A JavaScript library for building user interfaces
Get Started
Take the Tutorial** 

![React Logo w/ Text](https://goo.gl/Umyytc)

`;
export default App;
