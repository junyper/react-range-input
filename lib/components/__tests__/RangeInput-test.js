import React from 'react/addons';
import RangeInput from '../../index';

const TestUtils = React.addons.TestUtils;

describe('react-range-input', function() {
  it('renders and html5 input with type range', function() {
    const component = TestUtils.renderIntoDocument(
      <RangeInput />
    );
    const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
    expect(input.type).to.equal('range');
  });
});
