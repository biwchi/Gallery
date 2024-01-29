import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import '@/assets/scss/index.scss'

import App from '@/App'
import store from '@/store/index.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
