// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// components
import Masthead from '../../layouts/masthead.component';

// assets
import hero from '../../assets/hero_main.jpg';

// redux
import { getFutureEvents } from '../../redux/events/events.selectors';
import { setEventsList } from '../../redux/events/events.actions';

// utils
import { fetchAllEvents } from '../../firebase/firebase-fetch';

// component
const HpHero = () => {
  const dispatch = useDispatch();
  const futureEvents = useSelector(getFutureEvents);
  const latestEvent =
    futureEvents && futureEvents.future.length !== 0
      ? futureEvents.future[0]
      : null;

  const LinkElement = () => {
    return (
      <Link to={`/event/${latestEvent.id}`} className='ui huge primary button'>
        Prijavite se za sledecu sesiju
        <i className='right arrow icon'></i>
      </Link>
    );
  };

  useEffect(() => {
    (async () => {
      if (!futureEvents) {
        const eventsData = await fetchAllEvents();
        dispatch(setEventsList(eventsData));
      }
    })();
  }, []);

  return (
    <div className='hero-banner'>
      <Masthead url={hero} headline='Asocijacija Avanturista'>
        <h2>Udruzenje igraca i ljubitelja D&D-a.</h2>
        {latestEvent && LinkElement()}
      </Masthead>
    </div>
  );
};

export default HpHero;
