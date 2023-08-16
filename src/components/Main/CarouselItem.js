import React from 'react'
import arrowRight from '../../assets/ph_arrow-right-bold.png'
import classes from './CarouselItem.module.css';
function CarouselItem({ item }) {
  return (
    <div key={item.id} className='flex justify-between flex-1'>
      <p className='w-1/2 p-7'>

        {item.content}
      </p>
      <div className='w-1/2 p-7'>
        <img src={item.img} alt={item.content}/>

        <div className='flex justify-end mt-5'>
          <a className={classes.btnMore} href='/'>
            <span>
              More 
            </span>
            <img alt='arrowRight' src={arrowRight}/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CarouselItem