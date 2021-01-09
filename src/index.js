import { render } from 'react-dom';
import App from './App';
import '../styles/app.css';

const container = document.createElement('div');
document.body.appendChild(container);

render(<App eventId={132121337477} />, container);
