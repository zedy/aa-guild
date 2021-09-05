import AdminDashboard from '../pages/admin/admin-dashboard.component';
import EventPage from '../pages/event/event-page.component';
import EventForm from '../components/event/event-form.component';
import HomePage from '../pages/homepage/homepage.component';
import NewsListingPage from '../pages/news/news-listing-page.component';
import EventListPage from '../pages/event/event-list-page.component';
import PlayersListPage from '../pages/players-list/players-list.component';
import PlayerPage from '../pages/player/player.component';
import PlayerProfile from '../pages/player-profile/player-profile.component';
import SignInOut from '../pages/sign-in-out/sign-in-out.component';
//import Throw403 from '../pages/403/throw403.component';

export const DASHBOARD = '/admin/dashboard';
export const EVENT_PAGE = '/event/:id';
export const EVENT_FORM = '/event/create';
export const EVENT_LISTING = '/events';
export const HOME_PAGE = '/';
export const NEWS_LISTING = '/news';
export const PLAYER_LISTING = '/players-list';
export const PLAYER_PAGE = '/player/:id/character';
export const PLAYER_PROFILE = '/player/:id/profile';
export const SIGN_IN_OUT = '/signin';
//export const Throw403 = '/';

export const componentPaths = {
  dashboard: AdminDashboard,
  eventpage: EventPage,
  eventform: EventForm,
  eventlisting: EventListPage,
  homepage: HomePage,
  newslisting: NewsListingPage,
  playerlisting: PlayersListPage,
  playerpage: PlayerPage,
  playerprofile: PlayerProfile,
  signinout: SignInOut
};
