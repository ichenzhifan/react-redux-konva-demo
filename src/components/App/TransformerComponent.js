import React, {
  Component,
  Fragment,
  createRef,
  useRef,
  useEffect
} from 'react';
import {
  Stage,
  Layer,
  Rect,
  Text,
  Image,
  Transformer,
  Group
} from 'react-konva';
import Konva from 'konva';

class TransformerComponent extends Component {
  constructor(props) {
    super(props);

    this.checkNode = this.checkNode.bind(this);
    this.drawDragableRect = this.drawDragableRect.bind(this);
  }

  componentDidMount() {
    this.checkNode();
  }

  componentDidUpdate() {
    this.checkNode();
  }

  drawDragableRect(selectedNode){
    if(!selectedNode){
      return;
    }

    const width = this.transformer.width();
    const height = this.transformer.height();
    const x = this.transformer.x();
    const y = this.transformer.y();

    this.transformer.detach();

    const rect = new Konva.Rect({
      x,
      y,
      width,
      height,
      fill: 'transparent'
    });

    selectedNode.add(rect);
    this.transformer.attachTo(selectedNode);
  }

  checkNode() {
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;

    const selectedNode = stage.findOne('.' + selectedShapeName);
    // if (selectedNode === this.transformer.node()) {
    //   return;
    // }

    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }

    this.drawDragableRect(selectedNode);
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return (
      <Transformer
        ref={node => {
          this.transformer = node;
        }}
        keepRatio={false}
        rotateAnchorOffset={25}
      />
    );
  }
}

export default TransformerComponent;
