import React, { useState } from 'react'
import dashboard from '../../assets/Dashboard.png'
import dashboard2 from '../../assets/Dashboard1.png'
import Container from '../UI/Container';
import classes from './Carousel.module.css'
import CarouselItem from './CarouselItem'

function Carousel() {

    const DASHBOARDS = [
        {
            id: 0,
            content: "The Overview Dashboard offers a comprehensive overview of a country's performance in various sectors, subsectors and indicators throughout the years. Through nine intuitive charts, users can track overall percentile changes, sector scores, and indicator performances, empowering them to make data-driven decisions and gain valuable insights into the country's progress and areas for potential growth.",
            img: dashboard
        }, {
            id: 1,
            content: "The Comparison Dashboard provides a user-friendly interface to compare key performance indicators (KPIs) across countries and years. With easy-to-interpret charts, users can quickly assess and visualize the amount and rank changes of selected indicators over time, enabling them to identify trends and compare country performances effectively.",
            img: dashboard2
        }
    ]

    let [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = (e) => {
        e.preventDefault();

        let ind = currentIndex + 1 < DASHBOARDS.length ? currentIndex + 1 : 0
        setCurrentIndex(ind)
    }
    const previousSlide = (e) => {

        e.preventDefault()

        let ind = currentIndex - 1 < 0 ? DASHBOARDS.length - 1 : currentIndex - 1
        setCurrentIndex(ind)
    }
    return (
        <section className={classes.carousel}>
            <Container>
                <h3 className={classes.headingCarousel}>
                    Country Comparsion Dashboard
                </h3>
                <div className='flex justify-between items-center text-white'>
                    <div>
                        <a href='/' className='rounded-full w-10 flex items-center justify-center h-10 border border-white' onClick={previousSlide}>
                            <i className="fa-solid fa-arrow-left h-auto"></i>
                        </a>
                    </div>
                    <CarouselItem item={DASHBOARDS[currentIndex]} />

                    <div>
                        <a href='/' className='rounded-full w-10 flex items-center justify-center h-10 border border-white' onClick={nextSlide}>

                            <i className="fa-solid fa-arrow-right h-auto"></i>
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Carousel