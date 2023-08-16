import React, { useState } from 'react'
import Container from '../UI/Container'
import classes from './Navbar.module.css';
import Logo from '../../assets/Logo.png'
import DarkBtn from '../../assets/moon.png'
const Navbar = () => {
    const [isDark, setIsDark] = useState(true);
    const body = document.querySelector('body');
    body.className = isDark ? 'dark' : 'light';


    return (
        <Container>
            <div className={classes.navbarRow}>
                <div className={classes.logoBar}>
                    <img src={Logo} className={classes.logo} alt='Logo' />
                    <span>
                        Searchart
                    </span>
                </div>
                <div>
                    <ul className={classes.nav_links}>
                        <li>
                            <a href='/'>Policy area</a>
                        </li>
                        <li>
                            <a href='/'>Dashboard</a>
                        </li>
                        <li>
                            <a href='/'>Subscription</a>
                        </li>
                        <li>
                            <a href='/'>About us</a>
                        </li>
                        <li className={classes.toggleDark} onClick={()=>{setIsDark(!isDark)}}>

                            <img src={DarkBtn} alt='btnDark' />

                        </li>
                    </ul>
                </div>
                <div className={classes.btns}>
                    <a href='/'>Sign in</a>
                    <a className={classes.signUp} href='/'>Sign up</a>
                </div>
            </div>
        </Container>
    )
}

export default Navbar