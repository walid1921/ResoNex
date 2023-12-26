import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './tailwind-dark.css'
import { ContextProvider } from './contexts/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <video autoPlay muted loop id="video-background">
      {/* <source src="./backgroundVideo.mp4" type="video/mp4" /> */}
      <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" /> 
    </video>

    <ContextProvider>
      <App /> {/* didn't use strict mode so that syncfusion components work */}
    </ContextProvider >

    
    {/* <React.StrictMode> 
      <App />
    </React.StrictMode> */}
  </>
)
