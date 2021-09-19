// libs
import React from 'react';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import { Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// components
import Badge from '../badge/badge.component';

// helper functions
const renderBadges = ({ badges }) => {
  if (!badges) return <span>Go on advantures and earn some!</span>;

  return badges.map(badge => {
    return (
      <Link to='/badges' key={badge.id} className='badge'>
        <Badge key={badge.id} badge={badge} />
      </Link>
    );
  });
};

// component
const PlayerItem = ({ data }) => {
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
            <div className=''>
              Games played: <strong>{data.gamesPlayed}</strong>
            </div>
          </div>
          <div className='pointers'>
            <i className='ui chevron down icon'></i>
          </div>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <div className='top_panel'>
          <div className='top_left_stats'>
            <span className='stat'>
              Class: <strong>{data.pc.charClass}</strong>
            </span>
            <span className='stat'>
              Sub-class: <strong>{data.pc.subClass}</strong>
            </span>
            <span className='stat'>
              Race: <strong>{data.pc.race}</strong>
            </span>
            <span className='stat'>
              Level: <strong>{data.pc.level}</strong>
            </span>
          </div>
          <div className='middle_panel'>
            <div
              className='ui image'
              style={{ backgroundImage: `url(${data.characterPic})` }}></div>
          </div>
          <div className='top_right_stats'>
            <span className='stat'>
              Alignment: <strong>{data.pc.alignment}</strong>
            </span>
            <span className='stat'>
              Background: <strong>{data.pc.background}</strong>
            </span>
            <span className='stat'>
              Age/Sex/Height:
              <strong>
                {data.pc.age}/{data.pc.sex.charAt(0).toUpperCase()}/
                {data.pc.height}
              </strong>
            </span>
          </div>
        </div>
        <div className='bottom_panel'>
          <div className='bio'>
            <span>Character bio:</span>
            <div
              className='text'
              dangerouslySetInnerHTML={{ __html: data.pc.bio }}
            />
          </div>
          <div className='badges'>
            <span>
              Badges
              <Popup
                content='Go on adventures and do stuff and you might get some nice awards'
                trigger={<i className='ui info icon'></i>}
              />
            </span>
            <div className='badge-list'>{renderBadges(data.pc)}</div>
          </div>
        </div>
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export default PlayerItem;
