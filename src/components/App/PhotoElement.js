import React, { Component, Fragment, createRef } from 'react';
import { Stage, Layer, Rect, Text, Image } from 'react-konva';

const download = url => {
  return new Promise(resolve => {
    const image = new window.Image();

    image.onload = () => {
      resolve(image);
    };
    image.src = url;
  });
}

class ColoredRect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageObj: null
    };

    this.handleClick = () => {
      this.setState({
        color: Konva.Util.getRandomColor()
      });
    };
  }

  componentDidMount(){
    download(this.props.url).then(image => {
      this.setState({imageObj: image});
    });
  }

  render() {
    const {x, y, id, onClick} = this.props;
    const { imageObj, ratio = 0.1 } = this.state;
    if(!imageObj){
      return null;
    }

    const imageProps = {
      width: imageObj.width * ratio,
      height: imageObj.height * ratio,
      image: imageObj,
      x, 
      y,
      id,
      onClick: ev => onClick(id, ev)
    };

    return (
      <Image {...imageProps}/>
    );
  }
}

export default ColoredRect;
