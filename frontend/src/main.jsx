import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import store from './store/store'
import ThemeProvider from './utils/ThemeProvider'

const persistor = persistStore(store);


createRoot(document.getElementById('root')).render(
 <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider />
      </PersistGate>
    </Provider>
)
