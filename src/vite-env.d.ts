/// <reference types="vite/client" />

declare module 'pdfjs-dist/build/pdf.worker.mjs?url' {
  const workerSrc: string;
  export default workerSrc;
}

declare module 'mammoth/mammoth.browser' {
  const mammoth: {
    extractRawText: (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
  };
  export default mammoth;
}