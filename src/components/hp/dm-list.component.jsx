// libs
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

// components
import DMItem from './dm-item.component';

// redux
import { getDMList } from '../../redux/dm/dm.actions';

// utils
import { fetchDMList } from '../../utils/firebaseFetch';

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

  if (!dmList) return null;

  return (
    <section className='dm-list' style={{ marginTop: '5em' }}>
      <div className='ui container'>
        <h1>Nasi DM-ovi</h1>
        <div className='ui grid'>
          {dmList.map((dm, index) => (
            <DMItem item={dm} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DMList;
