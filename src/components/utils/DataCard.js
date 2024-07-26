import React from 'react';
import './DataCard.css';

const DataCard = ({ data }) => {
    if (!data) {
        return <div>No data available</div>;
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="retreat-card">
            <div className="image-wrapper">
                <img src={data.image} alt={data.title} />
            </div>
            <h2 className='title'>{data.title}</h2>
            <p>{data.description}</p>
            <p>Date: {formatDate(data.date)}</p>
            <p>Location: {data.location}</p>
            <p>Price: ${data.price}</p>
        </div>
    );
};

export default DataCard;
