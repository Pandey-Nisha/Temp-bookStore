import React ,{lazy, Suspense} from 'react'
import './Home.css'
import Header from '../../Component/Header/Header.jsx'
import { useState } from 'react'

const Bookdisplay = lazy(() => import('../../Component/Bookdisplay/Bookdisplay.jsx'));
const Home = () => {

  const [category, setCategory] = useState("null");

  return (
    <div>
      <Suspense fallback={<h1>Loading......</h1>} >
      <Header />
      <Bookdisplay/>
      </Suspense>
    </div>
  )
}

export default Home;
