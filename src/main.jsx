import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <video autoPlay muted loop id="video-background">
      {/* <source src="./backgroundVideo.mp4" type="video/mp4" /> */}
      <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
)
