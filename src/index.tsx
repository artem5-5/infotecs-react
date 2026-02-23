import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './app/App'

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <App />
    </HashRouter>
  </QueryClientProvider>,
  document.getElementById('root')
)