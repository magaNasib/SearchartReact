import React, { useRef } from 'react'
import Container from '../UI/Container'
import classes from './Banner.module.css'

function Banner() {
    const bottomEl = useRef(null)

    const scrollToBottom = () => {

        bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <Container>
            <div className={classes.banner}>
                <div>
                    <h1>
                        Welcome to <span>SEARCHART</span> !
                    </h1>
                    <p className={classes.content}>
                        The ultimate data analytics platform designed for managers in business, education, economics, health, and army, as well as government officials and researchers. Our dashboards are specifically designed to help you make critical strategic decisions, whether you're looking to benchmark your organization's performance against industry standards, evaluate different countries' performances, or conduct further research.
                    </p>
                </div>
                <div className={classes.scroll}>
                    <a href='/' onClick={e => {
                        e.preventDefault();
                        scrollToBottom()
                    }}>

                        <p>
                            Scroll to
                        </p>
                        <i className="fa-solid fa-angles-down"></i>
                    </a>
                </div>
            </div>
            <div ref={bottomEl}></div>

        </Container>

    )
}

export default Banner