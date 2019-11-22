import React, {
  Component,
  Fragment,
  createRef,
  useRef,
  useEffect
} from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../redux/selector/mapState';
import { mapDispatchToProps } from '../../redux/selector/mapDispatch';
import Route from '../Route';
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

import './index.scss';
import ColoredRect from './ColoredRect';
import PhotoElement from './PhotoElement';
import TransformerComponent from './TransformerComponent';

import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIds: [],
      elements: [
        {
          url: img2,
          x: 0,
          y: 0,
          id: 'img1'
        },
        {
          url: img3,
          x: 300,
          y: 0,
          id: 'img2'
        },
        {
          url: img2,
          x: 1000,
          y: 0,
          id: 'img3'
        }
      ]
    };

    this.selectElement = id => {
      const { selectedIds } = this.state;

      const index = selectedIds.findIndex(eid => eid === id);
      if (index === -1) {
        selectedIds.push(id);
      } else {
        selectedIds.splice(index, 1);
      }

      this.setState({
        selectedIds
      });
    };

    this.onStageMouseDown = e => {
      // const clickedOnEmpty = e.target === e.target.getStage();
      // if (clickedOnEmpty) {
      //   this.setState({
      //     selectedIds: []
      //   });
      // }
    };
  }

  render() {
    const { selectedIds, elements, node } = this.state;
    const stageProps = {
      width: window.innerWidth,
      height: window.innerHeight,
      onMouseDown: this.onStageMouseDown
    };

    const selectedElements = selectedIds
      ? selectedIds.map(id => elements.find(m => m.id === id))
      : [];
    const transformGroupProps = {
      draggable: true,
      name: 'transform-group'
    };

    return (
      <Stage {...stageProps}>
        <Layer>
          <Group ref={node => (this.node = node)}>
            {elements.map(m => {
              return <PhotoElement {...m} onClick={this.selectElement}/>;
            })}
          </Group>

          {selectedElements && selectedElements.length ? (
            <Fragment>
              <Group {...transformGroupProps}>
                {selectedElements.map(m => {
                  return <PhotoElement {...m} onClick={this.selectElement}/>;
                })}
              </Group>

              <TransformerComponent
                selectedShapeName={'transform-group'}
              />
            </Fragment>
          ) : null}
        </Layer>
      </Stage>
    );
  }
}

export default App;
