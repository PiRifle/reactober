import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './style/global.css';
import { Routes } from './routes'


render(
  <StrictMode>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)