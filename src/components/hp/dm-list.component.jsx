// libs
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// components
import DMItem from "./dm-item.component";

// redux
import { getDMList } from '../../redux/dm/dm.actions';

// utils
import { fetchDMList } from '../../utils/firebaseFetch';

const DMList = ({ putDMData }) => {
  const [dmList, setDmList] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await fetchDMList();
      setDmList(data);
      putDMData(data);
    })();
  }, []);

  if (!dmList) return null;

  return (
    <div className="dm-list" style={{ marginTop: "5em" }}>
      <div className="ui container">
        <h2 className="middle aligned">Nasi DM-ovi</h2>
        <div className="ui grid">
          {
            dmList.map((dm, index) => <DMItem item={dm} index={index} key={index} />)
          }
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  putDMData: data => dispatch(getDMList(data))
});

export default connect(null, mapDispatchToProps)(DMList);
