import React, { Component, Fragment, createRef } from 'react';
import {
  Stage,
  Layer,
  Rect,
  Text,
  Image,
  Group,
  Transformer
} from 'react-konva';
import PhotoElement from './PhotoElement';

class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.node = createRef();
    this.tNode = createRef();

    this.updateTransform = this.updateTransform.bind(this);
  }

  updateTransform(){
    setTimeout(() => {
      this.tNode.current.setNode(this.node.current);
      this.tNode.current.getLayer().batchDraw();
    });
  }

  componentWillUpdate(){

  }

  componentDidMount() {
    this.updateTransform();
  }

  render() {
    const { selectedIds, elements, onSelect } = this.props;

    const selectedElements = selectedIds
      ? selectedIds.map(id => elements.find(m => m.id === id))
      : [];
    const transformGroupProps = {
      ref: this.node,
      draggable: true
    };

    return (
      <Fragment>
        <Group>
          {elements.map(m => {
            return <PhotoElement {...m} onClick={onSelect} key={m.id} />;
          })}
        </Group>

        {selectedElements && selectedElements.length ? (
          <Fragment>
            <Group {...transformGroupProps}>
              {selectedElements.map((m, i) => {
                return (
                  <PhotoElement
                    {...m}
                    onClick={onSelect}
                    key={`${m.id}-${i}`}
                  />
                );
              })}
            </Group>
            <Transformer ref={this.tNode} />
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}

export default BookPage;
