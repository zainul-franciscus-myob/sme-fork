import EdgeDocumentViewer from './EdgeDocumentViewer';
import StandardDocumentViewer from './StandardDocumentViewer';

const isEdge = () => window.navigator.userAgent.includes('Edge');

const DocumentViewer = props => (
  isEdge()
    ? EdgeDocumentViewer(props)
    : StandardDocumentViewer(props)
);

export default DocumentViewer;
