// libs
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';

// components
import { Submit } from '../../buttons/buttons.component';
import Badge from '../badge.component';
import { checkbox } from '../../form/form-elements.component';

// firebase
import { fetchAllBadges } from '../../../firebase/firebase-fetch';
import { updatePlayerCharacterProfile } from '../../../firebase/firebase.utils';

// redux
import { getBadges } from '../../../redux/badges/badges.selectors';
import { setBadges } from '../../../redux/badges/badges.actions';

const getInitialValues = badges => {
  let init = {};

  badges.forEach(badge => {
    init[badge.id] = false;
  });

  return init;
};

// form
const AddBadgeForm = ({ data: { playerId, pc, badgeList } }) => {
  const dispatch = useDispatch();
  const badges = useSelector(getBadges);
  const [loading, setLoading] = useState(false);
  const initialValues = badges ? getInitialValues(badges) : {};

  useEffect(() => {
    (async () => {
      if (!badges) {
        const badges = await fetchAllBadges();
        dispatch(setBadges(badges));
      }
    })();
  });

  const formik = useFormik({
    initialValues: initialValues,
    initialTouched: false,
    onSubmit: async values => {
      setLoading(true);

      const data = prepareDataForFirestore(values);
      const response = await updatePlayerCharacterProfile(playerId, data);
      toastr[response.status](response.message);

      setLoading(false);
    }
  });

  // helpers
  const prepareDataForFirestore = values => {
    const keys = Object.keys(values);
    const newBadgeList = badgeList.concat(keys);
    const newBadgesObj = [];

    badges.forEach(badge => {
      if (newBadgeList.includes(badge.id)) {
        newBadgesObj.push(badge);
      }
    });

    pc.badges = newBadgesObj;
    return pc;
  };

  if (!badges) return null;

  return (
    <>
      <form
        className={`ui form ${loading ? 'loading' : ''}`}
        onSubmit={formik.handleSubmit}>
        <div className='badge-list badge-form'>
          {badges.map(badge => {
            return (
              <div className='item' key={badge.id}>
                <Badge badge={badge} />

                {!badgeList.includes(badge.id)
                  ? checkbox(badge.id, formik)
                  : null}
              </div>
            );
          })}
        </div>
        <div className='ui divider'></div>
        {Submit()}
      </form>
    </>
  );
};

export default AddBadgeForm;
