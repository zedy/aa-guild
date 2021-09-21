// libs
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { toastr } from 'react-redux-toastr';

// firestore
import { fetchUser } from '../../utils/firebaseFetch';
import {
  updateAttendeesList,
  updateUserProfile
} from '../../firebase/firebase.utils';

const getDate = eventDate => {
  var theDate = new Date(eventDate * 1000);
  return theDate.toUTCString();
};

const getUsersFromFirestore = async userId => {
  const response = await fetchUser(userId);
  return response;
};

// component
const EventPlayerList = ({ event }) => {
  const [loading, setLoading] = useState(false);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getUsersList();
  }, []);

  const initialValues = () => {
    let init = {};

    event.attendees.forEach(userId => {
      init[userId] = event.confirmedAttendees.includes(userId);
    });

    return init;
  };

  const getUsersList = () => {
    setUsersList([]);
    event.attendees.forEach(userId => {
      (async () => {
        const user = await getUsersFromFirestore(userId);
        setUsersList(usersList => [...usersList, user]);
      })();
    });
  };

  const getValuesForFirestore = values => {
    const initValues = initialValues();
    const inc = [];
    const dec = [];
    const sync = [];

    Object.keys(values).filter((value, idx) => {
      if (Object.values(values)[idx]) {
        sync.push(value);
      }

      if (Object.values(values)[idx] !== Object.values(initValues)[idx]) {
        let newObj = {};
        newObj.id = value;

        if (Object.values(values)[idx]) {
          newObj.direction = 'increase';
          inc.push(newObj);
        } else if (!Object.values(values)[idx]) {
          newObj.direction = 'decrease';
          dec.push(newObj);
        }
      }
    });

    return {
      playerList: sync,
      gamesPlayedList: [inc, dec]
    };
  };

  const updateUsersGamesPlayedField = async valuesToUpdate => {
    let userObjList = {};

    usersList.map(user => (userObjList[user.id] = user));

    valuesToUpdate.forEach(array => {
      if (array.length) {
        array.forEach(item => {
          let user = userObjList[item.id];
          let number =
            item.direction === 'increase'
              ? user.gamesPlayed + 1
              : user.gamesPlayed - 1;
          let data = { gamesPlayed: number };
          (async () => {
            await updateUserProfile(user, data);
          })();
        });
      }
    });
  };

  const formik = useFormik({
    initialValues: initialValues(),
    initialTouched: false,
    onSubmit: async values => {
      setLoading(true);

      const playerValues = getValuesForFirestore(values);
      await updateUsersGamesPlayedField(playerValues.gamesPlayedList);
      const response = await updateAttendeesList(
        event.id,
        playerValues.playerList
      );
      toastr[response.status](response.message);

      getUsersList();
      setLoading(false);
    }
  });

  if (!usersList) return null;

  return (
    <div className='ui container content'>
      <h1 style={{ marginBottom: '2em' }}>
        List of players for {getDate(event.date.seconds)}
      </h1>
      <form
        className={`ui form ${loading ? 'loading' : ''}`}
        onSubmit={formik.handleSubmit}>
        <div className='ui divided list'>
          {usersList.map(user => {
            return (
              <div className='item' key={user.email}>
                <div className='ui grid'>
                  <div className='fourteen wide column'>
                    <div className='ui list'>
                      <div className='item'>
                        <img
                          className='ui avatar image'
                          src={user.profilePic}
                          alt='alt-tag'
                        />
                        <div className='content'>
                          <span className='header'>
                            {user.fullName.toUpperCase()} --- {user.id}
                          </span>
                          <div className='description'>
                            Games attended: <strong>{user.gamesPlayed}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='two wide column field'>
                    <div className='ui checkbox'>
                      <input
                        type='checkbox'
                        name={user.id}
                        onChange={event => {
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
        <div className='ui top attached label' style={{ top: '-20px' }}>
          <div className='ui grid'>
            <div className='fourteen wide column'>Player name</div>
            <div className='two wide column'>Attended</div>
          </div>
        </div>
        <button className='ui teal button' type='submit'>
          Save
        </button>
      </form>
    </div>
  );
};

export default EventPlayerList;
