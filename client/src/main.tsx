import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import ApolloProvider from './hooks/ApolloProvider.tsx'
import { Provider as JotaiProvider } from 'jotai'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JotaiProvider>
      <ApolloProvider>
        <Router>
          <App />
        </Router>
      </ApolloProvider>
    </JotaiProvider>
  </React.StrictMode>,
)
