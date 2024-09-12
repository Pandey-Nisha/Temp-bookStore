import React from 'react'
import './Exploregenre.css';
import { genre_list } from '../../assets/assets';

const Exploregenre = ({category,setCategory}) => {

  return (
    <div className='exploregenre' id='exploregenre'>
        <h1>Explore our genre</h1>
        <p className='exploregenre-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere laborum doloribus et illum libero officiis quos quas dolores minus quidem?</p>
        <div className="explore-genre-list">
            {genre_list.map ((item,index) => {
                return (
                    <div onClick={()=> setCategory((prev) => prev === item.genre_name ? "null" : item.genre_name)} key={index} className='exploregenre-list-item'>
                        <img className={category === item.genre_name ? "active" : ""} src={item.genre_image} alt="" />
                        <p>{item.genre_name}</p>
                    </div> 
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default Exploregenre
