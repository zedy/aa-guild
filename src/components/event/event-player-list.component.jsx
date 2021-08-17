// libs
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toastr } from "react-redux-toastr";

// firestore
import { fetchUser } from "../../utils/firebaseFetch";
import { updateAttendeesList } from '../../firebase/firebase.utils';

const EventPlayerList = ({ event }) => {
  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [userIdList, setUserIdList] = useState([]);

  useEffect(() => {
    event.attendees.forEach((userId) => {
      if (!userIdList.includes(userId)) {
        setUserIdList((userIdList) => [...userIdList, userId]);
        (async () => {
          const user = await getUsersFromFirestore(userId);
          setUsersList((usersList) => [...usersList, user]);
        })();
      }
    });
  }, []);

  const initialValues = () => {
    let init = {};

    event.attendees.forEach((userId) => {
      init[userId] = event.confirmedAttendees.includes(userId);
    });

    return init;
  };

  const getDate = (eventDate) => {
    var theDate = new Date(eventDate * 1000);
    return theDate.toUTCString();
  };

  const getUsersFromFirestore = async (userId) => {
    const response = await fetchUser(userId);
    return response;
  };

  const getListOfAttendees = (values) => {
    let data = [];
    const keys = Object.keys(values);

    for (const key of keys) {   
      if (values[key]) data.push(key);
    }

    return data;
  };

  const formik = useFormik({
    initialValues: initialValues(),
    initialTouched: false,
    onSubmit: async (values) => {
      setLoading(true);
      const data = getListOfAttendees(values);
      const response = await updateAttendeesList(event.id, data);
      toastr[response.status](response.message);
      setLoading(false);
    },
  });

  if (!usersList) return null;

  return (
    <>
      <h1 style={{marginBottom: '2em'}}>List of players for {getDate(event.date.seconds)}</h1>
      <form
        className={`ui form ${loading ? "loading" : ""}`}
        onSubmit={formik.handleSubmit}
      >
        <div className="ui divided list">
          {usersList.map((user) => {
            return (
              <div className="item" key={user.email}>
                <div className="ui grid">
                  <div className="fourteen wide column">
                    <div className="ui list">
                      <div className="item">
                        <img
                          className="ui avatar image"
                          src={user.profilePic}
                          alt="alt-tag"
                        />
                        <div className="content">
                          <span className="header">
                            {user.fullName.toUpperCase()}
                          </span>
                          <div className="description">
                            Games attended: <strong>{user.gamesPlayed}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="two wide column field">
                    <div className="ui checkbox">
                      <input
                        type="checkbox"
                        name={user.id}
                        onChange={(event) => {
                          const value = event.target.checked ? true : false;
                          formik.setFieldValue(user.id, value);
                        }}
                        checked={formik.values[user.id] === true}
                      />
                      <label>&nbsp;</label>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="ui top attached label" style={{ top: "-20px" }}>
          <div className="ui grid">
            <div className="fourteen wide column">Player name</div>
            <div className="two wide column">Attended</div>
          </div>
        </div>
        <button className="ui teal button" type="submit">
          Save
        </button>
      </form>
    </>
  );
};

export default EventPlayerList;
