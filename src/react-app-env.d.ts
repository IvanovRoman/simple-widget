/// <reference types="react-scripts" />

interface ExternalWRDSWidget {
  render(parent: HTMLElement): void;
  dispose(): void;
  setRequestor?(requestor: any): void;
}
