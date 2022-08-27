import * as React from 'react';
import { createRoot } from 'react-dom/client';

interface Props {
    requestor: any;
}

export const Counter: React.FC<Props> = ({ requestor }) => {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      const guid = await requestor.getWrapperGuid();
      const dsInfo = await requestor.getInfo(guid);
      console.log('DsInfo: ', dsInfo);
      setCounter(dsInfo.rowCount);
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Counter!</h1>
      <div>Counter: {counter}</div>
    </>
  );
}

export class WRDSWidgetCounter implements ExternalWRDSWidget {
  private requestor: any;

  setRequestor(requestor: any): void {
    this.requestor = requestor;
  }

  render(parent: HTMLElement) {
    createRoot(parent).render(<Counter requestor={this.requestor} />);
  }

  dispose() {
    console.log('Call dispose: ', this.constructor.name);
  }
}