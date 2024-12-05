import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './components/redux/store';

const client = new ApolloClient({
  uri: 'http://it2810-35.idi.ntnu.no:3001',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {' '}
      {}
      <ApolloProvider client={client}>
        <BrowserRouter basename='/project2'>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </StrictMode>,
);