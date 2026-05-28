import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

const notes = [
  {
    id: 1,
    name: "Jean",
    age: 21
  },
  {
    id: 2,
    name: "Paul",
    age: 12
  },
  {
    id: 3,
    name: "Anne",
    age: 25
  }
]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App notes={notes} />
  </StrictMode>,
)
