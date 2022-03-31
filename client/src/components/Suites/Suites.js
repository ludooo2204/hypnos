import React from 'react'
import { useLocation } from 'react-router-dom'

const Suites = () => {
  const {state} = useLocation()
console.log(state)
  return (
    <div>Suites</div>
  )
}

export default Suites