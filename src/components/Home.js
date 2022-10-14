import React, { useState } from 'react'
import AddNote from './AddNote'
import Alert from './Alert'
import Notes from './Notes'



const Home = (props) => {
  
  
  return (
    <>
    <AddNote setCustomAlert={props.setCustomAlert}/>
    <Notes setCustomAlert={props.setCustomAlert}/>
    </>
  )
}

export default Home
