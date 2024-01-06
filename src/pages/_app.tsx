import React from 'react'
import { useParams } from 'react-router-dom'

const App = ({children}: any) => {
  console.log(children)
  return <div children={children}></div>
} 

export default App