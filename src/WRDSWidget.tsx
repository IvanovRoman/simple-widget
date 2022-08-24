import React = require('react');
import * as ReactDOM from 'react-dom';

interface ExternalWRDSWidget {
  render(parent: HTMLElement): void;
}

export class WRDSWidget implements ExternalWRDSWidget {
  render(parent: HTMLElement) {
    ReactDOM.render(<div>Hello World!</div>, parent);
    return () => ReactDOM.unmountComponentAtNode(parent);
  }
}

export function getWRDSWidget() {
  return {
    viewType: 'simple-widget',
    name: 'Simple custom widget',
    create: () => new WRDSWidget()
  };
}
