import React from 'react'
import { Link } from 'react-router';

const Card = (props) => {
    const { id, title, img, type, deleteRestaurant, setPopup } = props;

  return (
    <>
      <div className="card bg-base-100 h-[384px] w-96 shadow-sm">
        <figure className="overflow-hidden h-50">
          <img className="w-full object-cover" src={img} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {title}
            <div className="badge badge-secondary">New</div>
          </h2>
          <p>{type}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-outline btn-error"
              onClick={() => deleteRestaurant(id)}
            >
              Delete
            </button>
            <Link
              to={`/update/${id}`}
              onClick={() => setPopup(true)}
              className="btn btn-outline btn-warning"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card