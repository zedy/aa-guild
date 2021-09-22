// libs
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// components
import DMItem from './dm-item.component';
import { Placeholder } from '../../components/static/static.component';

// redux
import { getDMList } from '../../redux/dm/dm.actions';

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
  const [dmList, setDmList] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchDMList();
      setDmList(data);
      dispatch(getDMList(data));
    })();
  }, []);

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
