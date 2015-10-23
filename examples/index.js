import React from 'react';
import ReactDom from 'react-dom';
import RangeInput from '../lib/index';

const Examples = React.createClass({
  render() {
    return (
      <div>
        <h1>react-range-input</h1>
        <RangeInput labelText="Opacity" defaultValue={25} name="opacity" max={100} min={0} />
      </div>
    );
  }
});

ReactDom.render(<Examples/>, document.getElementById('examples'));
