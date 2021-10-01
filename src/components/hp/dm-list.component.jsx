// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import DMItem from './dm-item.component';
import { Placeholder } from '../../components/static/static.component';

// redux
import { setDMList } from '../../redux/dm/dm.actions';
import { getDMs } from '../../redux/dm/dm.selectors';

// utils
import { fetchDMList } from '../../firebase/firebase-fetch';

// helper functions
const renderPlaceholder = () => (
  <div className='twelve wide column'>
    <Placeholder placeholderClass='fluid' />
  </div>
);

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
          {!dmList ? renderPlaceholder() : renderData(dmList)}
        </div>
      </div>
    </section>
  );
};

export default DMList;
