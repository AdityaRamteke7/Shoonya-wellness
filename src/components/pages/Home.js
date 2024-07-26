import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import logo from "../assets/yogoimg.jpg"
import Filter from '../utils/Fillter'
import "../../index.css"
import SearchBar from "../utils/Search.js"
import DataCard from '../utils/DataCard.js'
import Pagination from '../utils/Pagination.js'
const Home = () => {

    const {
        data,
    } = useContext(DataContext);
    console.log(data)


    return (
        <>
            <div className='home'>
                <div className='home-container'>
                    <img src={logo} alt='Hero section' />
                    <h2>Discover Your Inner Peace</h2>
                    <p>join us for a series of wellness retreats designed to help you find tranquililty and rejuvention.</p>
                </div>

            </div>
            <div className='filter-home'>
                <Filter />
                <SearchBar />
            </div>
            <div className="retreats-list">
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <DataCard key={item.id} data={item} />
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
            <Pagination />
            <footer>
                © 2024  wellness retreats. All rigths reserved.
            </footer>
        </>
    )
}

export default Home