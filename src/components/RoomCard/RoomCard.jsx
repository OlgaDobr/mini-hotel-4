import React from 'react';
import { Link } from 'react-router-dom';

function RoomCard({ room }) {
    return (
        <div className="card">
            <img src={room.image} className="card-img-top" alt={room.name} />
            <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">{room.description}</p>
                <p className="card-text">Price: ${room.price}</p>
                <Link to={`/rooms/${room.id}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    );
}

export default RoomCard;
