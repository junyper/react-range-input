import React from 'react';
import TestUtils from 'react-addons-test-utils';
import RangeInput from '../../index';

describe('react-range-input', function() {
  it('renders and html5 input with type range', function() {
    const component = TestUtils.renderIntoDocument(
      <RangeInput labelText="Opacity" defaultValue={25} name="opacity" max={100} min={0} />
    );

    const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

    expect(input.type).to.equal('range');
  });
});
