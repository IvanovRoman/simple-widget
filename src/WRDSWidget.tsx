import * as React from 'react';
import { createRoot } from 'react-dom/client';


import { WRDSWidgetCounter } from './WRDSWidgetCounter';
import { WRDSWidgetTable } from './WRDSWidgetTable';

export class WRDSWidget implements ExternalWRDSWidget {
  render(parent: HTMLElement) {
    createRoot(parent).render(<div>Hello World!</div>);
  }

  dispose() {
    console.log('Call dispose: ', this.constructor.name);
  }
}

export function getWRDSWidgets() {
  return [
    {
      viewType: 'table-widget',
      name: 'Basic table widget',
      create: () => new WRDSWidgetTable()
    },
    {
      viewType: 'simple-widget',
      name: 'Simple custom widget',
      create: () => new WRDSWidget()
    },
    {
      viewType: 'widget-counter',
      name: 'Simple widget counter',
      create: () => new WRDSWidgetCounter()
    }
  ];
}
