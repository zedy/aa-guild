// libs
import React from 'react';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';

// redux
import { hideModal, showModal } from '../../redux/modal/modal.actions';

// firestore
import { updatePlayerCharacterProfile } from '../../firebase/firebase.utils';

// components
import Badge from '../badge/badge.component';
import {
  AddBadgeToPlayer,
  RemoveBadgeFromPlayer
} from '../buttons/buttons.component';

// helper functions
const AssignedBadges = pc => {
  let badgeList = [];

  if (pc.hasOwnProperty('badges')) {
    badgeList = pc.badges.map(badge => {
      return badge.id.replace(/ /g, '');
    });
  }

  return badgeList;
};

// component
const PlayerItemAdmin = ({ data }) => {
  const dispatch = useDispatch();
  let badgeList = AssignedBadges(data.pc);

  const openBadgeModal = e => {
    e.preventDefault();
    dispatch(
      showModal({
        modalType: 'ADD_BADGE',
        modalProps: {
          pc: data.pc,
          playerId: data.id,
          badgeList: badgeList,
          closeModal: closeModal
        }
      })
    );
  };

  const openBadgeDeleteModal = (e, badgeId) => {
    e.preventDefault();
    dispatch(
      showModal({
        modalType: 'DELETE_BADGE',
        modalProps: {
          badgeId: badgeId,
          removeBadge: removeBadge,
          closeModal: closeModal
        }
      })
    );
  };

  // helper functions
  const renderBadges = badges => {
    if (!badges) return null;
    return badges.map(badge => {
      return (
        <div key={badge.id} className='item'>
          <Badge badge={badge} />
          {RemoveBadgeFromPlayer(openBadgeDeleteModal, badge.id)}
        </div>
      );
    });
  };

  const removeBadge = async badgeId => {
    const pcData = removeBadgeFromBadgeList(badgeId.replace(/ /g, ''));
    const response = await updatePlayerCharacterProfile(data.id, pcData);
    toastr[response.status](response.message);
    closeModal();
  };

  const removeBadgeFromBadgeList = badgeId => {
    badgeList = badgeList.filter(id => id !== badgeId);
    let newBadges = data.pc.badges.filter(badge => badge.id !== badgeId);
    data.pc.badges = newBadges;

    return data.pc;
  };

  const closeModal = () => {
    dispatch(hideModal());
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
          <div className='pointers'>
            <i className='ui chevron down icon'></i>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div className='bottom_panel'>
          <div className='badges'>
            <strong>Badges: </strong>
            <div className='actions'>{AddBadgeToPlayer(openBadgeModal)}</div>
            <div className='badge-list'>{renderBadges(data.pc.badges)}</div>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default PlayerItemAdmin;
