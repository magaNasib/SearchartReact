import React from 'react'
import classes from './Header.module.css'
function Header(props) {
  return (
    <div className={classes.header}>
        {props.children}
    </div>
  )
}

export default Header