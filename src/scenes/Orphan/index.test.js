import React from 'react';
import ReactDOM from 'react-dom';
import Orphan from './index.js';
import renderer from 'react-test-renderer';


test('Orphan component matches snapshot', () => {
    const orphan = renderer.create(<Orphan/>);
    let tree = orphan.toJSON();
    expect(tree).toMatchSnapshot();
  });