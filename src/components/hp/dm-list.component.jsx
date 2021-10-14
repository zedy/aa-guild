// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import DMItem from './dm-item.component';

// redux
import { setDMList } from '../../redux/dm/dm.actions';
import { getDMs } from '../../redux/dm/dm.selectors';

// utils
import { fetchDMList } from '../../firebase/firebase-fetch';

// utils
import { renderPlaceholders } from '../../utils';

// constants
const PLACEHOLDER_NUMBER = 3;

// helper functions
const renderData = dmList => {
  return dmList.map((dm, index) => (
    <DMItem item={dm} index={index} key={index} />
  ));
};
//

// component
const DMList = () => {
  const dispatch = useDispatch();
  const dmList = useSelector(getDMs);

  useEffect(() => {
    (async () => {
      if (!dmList.length) {
        const data = await fetchDMList();
        dispatch(setDMList(data));
      }
    })();
  }, [dispatch]);

  return (
    <section className='dm-list'>
      <div className='ui container content'>
        <h1>Nasi DM-ovi</h1>
        <div className='ui grid'>
          {!dmList.length ? (
            <div className='sixteen wide column'>
              {renderPlaceholders(PLACEHOLDER_NUMBER)}
            </div>
          ) : (
            renderData(dmList)
          )}
        </div>
      </div>
    </section>
  );
};

export default DMList;
