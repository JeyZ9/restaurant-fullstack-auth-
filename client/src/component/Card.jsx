import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { useAuthContext } from '../context/auth.context';

const Card = (props) => {
    const { id, title, img, type, deleteRestaurant, setPopup } = props;
    const { user } = useAuthContext();
    // const { role, setRole } = useState([]);

    useEffect(() => {
      console.log("USER:", user.authorities);
    }, [user]);

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
            {user && user.authorities.find((user) => user == "ROLE_ADMIN") ? (
              <>
                <Link
                  to={`/update/${id}`}
                  onClick={() => setPopup(true)}
                  className="btn btn-outline btn-warning"
                >
                  Edit
                </Link>
                <Link
                  to={`/delete`}
                  className="btn btn-outline btn-error"
                  onClick={() => deleteRestaurant(id)}
                >
                  Delete
                </Link>
              </>
            ) :
              user.authorities.find((user) => user == "ROLE_MODERATOR") ? (
                <>
                  <Link
                    to={`/update/${id}`}
                    onClick={() => setPopup(true)}
                    className="btn btn-outline btn-warning"
                  >
                    Edit
                  </Link>
                </>
              ):
              (<></>)
            }

            {}
            {/* {user.authorities == "ROLE_ADMIN" ||
            user.authorities == "ROLE_MODERATOR" ? (
              <Link
                to={`/update/${id}`}
                onClick={() => setPopup(true)}
                className="btn btn-outline btn-warning"
              >
                Edit
              </Link>
            ) : user.authorities == "ROLE_ADMIN" ? (
              <Link
                to={`/delete`}
                className="btn btn-outline btn-error"
                onClick={() => deleteRestaurant(id)}
              >
                Delete
              </Link>
            ) : (
              <div></div>
            )} */}
            {/* <Link
              to={`/update/${id}`}
              onClick={() => setPopup(true)}
              className="btn btn-outline btn-warning"
            >
              Edit
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card