import React from 'react'
import Container from '../UI/Container';
import classes from './Sectors.module.css'
import Agriculture from '../../assets/bugda.png'
import Economy from '../../assets/dollar.png'
import Technology from '../../assets/techno.png'
import Health from '../../assets/health.png'
import Social from '../../assets/social.png'
import Army from '../../assets/army.png'
import Government from '../../assets/government.png'
import Transportation from '../../assets/transport.png'
import Index from '../../assets/index.png'
import Other from '../../assets/Other.png'
function Sectors() {

    const sectors_data = [
        {
            id: 0,
            img: Agriculture,
            title: 'Agriculture'
        }, {
            id: 1,
            img: Economy,
            title: 'Economy'
        }, {
            id: 2,
            img: Technology,
            title: 'Technology & Innovation'
        }, {
            id: 3,
            img: Health,
            title: 'Health'
        }, {
            id: 4,
            img: Social,
            title: 'Social'
        }, {
            id: 5,
            img: Army,
            title: 'Army'
        }, {
            id: 6,
            img: Government,
            title: 'Government'
        }, {
            id: 7,
            img: Transportation,
            title: 'Transportation'
        }, {
            id: 8,
            img: Index,
            title: 'Index'
        }
    ]
    return (

        <Container className='py-9 hover:snap-x'>
            <p className={classes.title}>
                Discover a diverse range of sectors, each providing in-depth insights into subsectors and indicators within them.
            </p>
            <ul className='flex flex-wrap justify-between py-5'>
                {
                    sectors_data.map((sector) => {
                        return (
                            <li className='basis-1/5 flex p-1 justify-center' key={sector.id} >

                                <a href='/'>
                                    <img src={sector.img} alt={sector.title} className='rounded-lg'/>
                                    <div className='text-center text-sm py-2'>{sector.title}</div>
                                </a>
                            </li>
                        )
                    })
                }
                <li className='basis-1/5 flex p-3'>

                    <a href='/'>
                        <img src={Other} alt='other'  className='rounded-lg'/>
                        <div className='text-center text-sm py-2'>...</div>
                    </a>
                </li>
            </ul>

        </Container>
    )
}

export default Sectors