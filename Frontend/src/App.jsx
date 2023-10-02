//import { useState } from 'react'
import Footer from './layouts/modules/footer'
import ResponsiveAppBar from './layouts/modules/navbar'
import  MainPage  from './layouts/pages/mainPage'
import './App.css'

function App() {

  return (
    <>
    <ResponsiveAppBar/>
    <MainPage/>
    <Footer/>
    </>
  )
}

export default App
