// libs
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';

// redux
import { showModal } from '../../redux/modal/modal.actions';

// components
import Badge from '../badge/badge.component';
import { AddBadgeToPlayer } from '../buttons/buttons.component';

// helper functions
const renderBadges = (handleClick, badges) => {
  if (!badges) return null;
  return badges.map(badge => {
    return <Badge key={badge.id} badge={badge} removeBadge={handleClick} />;
  });
};

// component
const PlayerItemAdmin = ({ data }) => {
  const dispatch = useDispatch();

  const handleClick = (e, id) => {
    e.preventDefault();
    console.log(id);
    dispatch(showModal('tits'));
  };

  return (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          <img
            style={{ width: '100px', height: '100px' }}
            className='ui avatar image'
            src={`${data.profilePic}`}
            alt='player avatar'
          />
          <div className='content'>
            <strong className='header'>{data.displayName.toUpperCase()}</strong>
            <div className=''>
              Players character: <strong>{data.pc.name}</strong>
            </div>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div className='bottom_panel'>
          <div className='badges'>
            <strong>Badges: </strong>
            <div className='actions'>{AddBadgeToPlayer(handleClick)}</div>
            <div className='badge-list'>
              {renderBadges(handleClick, data.pc.badges)}
            </div>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default PlayerItemAdmin;
