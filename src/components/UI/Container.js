import React from 'react'

import classes from './Container.module.css'
const Container = (props) => {

  return (
    <div className={classes.container}>

      <div className={props.className}>
        {props.children}
      </div>
    </div>
  )
}

export default Container