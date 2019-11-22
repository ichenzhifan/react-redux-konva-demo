import React, { Component, Fragment, createRef } from 'react';
import { render } from 'react-dom';
import Konva from 'konva';
import { Stage, Layer, Rect, Transformer, Group } from 'react-konva';
import TransformerComponent from './TransformerComponent';

class Rectangle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, data } = this.props;
    const {width, height} = data;

    // 中心点旋转.
    const offset = {
      x: width/2,
      y: height/2
    };

    const rectAttr = {
      offset,
      ...data
    };

    return (
      <Rect
        {...rectAttr}
        onClick={ev => onClick && onClick(data.name, ev)}
      />
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rectangles: [
        {
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          fill: 'red',
          rotation: 45,
          name: 'rect1'
        },
        {
          x: 350,
          y: 150,
          width: 100,
          height: 100,
          fill: 'green',
          name: 'rect2'
        }
      ],
      selectedNames: [],
      transformerDragRectProps: null,

      selectedShapeName: 'transfrom-group'
    };

    this.transformData = {
      start: null,
      end: null
    };
    this.updateTransformData = this.updateTransformData.bind(this);
    this.updateElementAttrs = this.updateElementAttrs.bind(this);

    this.handleStageMouseDown = this.handleStageMouseDown.bind(this);
    this.handleRectChange = this.handleRectChange.bind(this);
    this.selectElement = this.selectElement.bind(this);
  }

  handleStageMouseDown(e) {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedNames: []
      });
      return;
    }

    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === 'Transformer';

    if (clickedOnTransformer) {
      return;
    }
  }

  handleRectChange(index, newProps) {
    const rectangles = this.state.rectangles.concat();
    rectangles[index] = {
      ...rectangles[index],
      ...newProps
    };

    this.setState({ rectangles });
  }

  selectElement(name) {
    const { selectedNames } = this.state;

    const index = selectedNames.findIndex(m => m === name);
    if (index === -1) {
      selectedNames.push(name);
    } else {
      selectedNames.splice(index, 1);
    }

    this.setState({
      selectedNames
    });
  }

  updateTransformData(ev, isStart) {
    const shape = ev.currentTarget;

    const obj = {
      x: shape.x(),
      y: shape.y(),
      rotation: shape.rotation(),
      scaleX: shape.scaleX(),
      scaleY: shape.scaleY()
    };

    if (isStart) {
      this.transformData.start = obj;
    } else {
      this.transformData.end = obj;
    }
  }

  updateElementAttrs(selectedShapes) {
    if (selectedShapes && selectedShapes.length) {
      const deltX = this.transformData.end.x - this.transformData.start.x;
      const deltY = this.transformData.end.y - this.transformData.start.y;
      const deltScaleX = this.transformData.end.scaleX;
      const deltScaleY = this.transformData.end.scaleY;
      const deltRotation =
        this.transformData.end.rotation - this.transformData.start.rotation;
      
      const isMoving = deltX || deltY;
      const isResizing = deltScaleX !== 1 || deltScaleY !== 1;
      const isRotating = deltRotation;

      const { rectangles, selectedNames } = this.state;
      selectedShapes.forEach(m => {
        const index = rectangles.findIndex(item => item.name === m.name);
        if (index !== -1) {
          const oldItem = rectangles[index];
          const { width, height, rotation = 0, x, y } = oldItem;
          const newAttr = {};

          if(isRotating){
            newAttr.rotation = rotation + deltRotation;
          }
          
          if(isResizing){
            newAttr.width = width * deltScaleX;
            newAttr.height = height * deltScaleY;
          }
          
          if(isMoving){
            newAttr.x = x + deltX;
            newAttr.y = y + deltY;
          }

          rectangles[index] = Object.assign({}, oldItem, newAttr);
        }
      });

      this.setState({ rectangles, selectedNames: [] }, () => {
        this.setState({ selectedNames });
      });

      this.transformData = {
        start: null,
        end: null
      };
    }
  }

  render() {
    const { selectedNames, rectangles: shapes, selectedShapeName } = this.state;

    const selectedShapes = selectedNames
      .map(name => {
        const shape = shapes.find(m => m.name === name);
        return shape;
      })
      .filter(v => v);

    const rectangles = shapes.filter(m => {
      const index = selectedNames.findIndex(name => name === m.name);

      return index === -1;
    });

    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={this.handleStageMouseDown}
      >
        <Layer>
          {rectangles.map((rect, i) => (
            <Rectangle key={i} data={rect} onClick={this.selectElement} />
          ))}

          {selectedShapes && selectedShapes.length ? (
            <Fragment>
              <Group
                draggable={true}
                name={selectedShapeName}
                onTransformStart={ev => {
                  // console.log('start', ev.currentTarget.children[0].x());
                  this.updateTransformData(ev, true);
                }}
                onTransformEnd={ev => {
                  // console.log('end', ev.currentTarget.children[0].x());
                  this.updateTransformData(ev, false);
                  this.updateElementAttrs(selectedShapes);
                }}
                onDragStart={ev => {
                  this.updateTransformData(ev, true);
                }}
                onDragEnd={ev => {
                  this.updateTransformData(ev, false);
                  this.updateElementAttrs(selectedShapes);
                }}
              >
                {selectedShapes.map((rect, i) => {
                  return <Rectangle key={i} data={rect} />;
                })}
              </Group>
              <TransformerComponent selectedShapeName={selectedShapeName} />
            </Fragment>
          ) : null}
        </Layer>
      </Stage>
    );
  }
}

export default App;
