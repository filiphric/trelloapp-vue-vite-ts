import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';

// Set Authorization header synchronously before any components mount,
// so that child useEffect hooks (e.g. BoardList) have the header available.
const getCookieValue = (name: string) => document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop();
const authToken = getCookieValue('auth_token');
if (authToken && authToken.split('.')[1]) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
}

ReactDOM.createRoot(document.getElementById('app')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
