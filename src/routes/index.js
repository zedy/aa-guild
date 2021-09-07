import AdminDashboard from '../pages/admin/admin-dashboard.component';
import EventRoutePage from '../pages/event/event-page.component';
import EventForm from '../components/event/event-form.component';
import EventListPage from '../pages/event/event-list-page.component';
import HomePage from '../pages/homepage/homepage.component';
import NewsArticle from '../components/news/news.component';
import NewsForm from '../components/news/news-form.component';
import NewsListingPage from '../pages/news/news-listing-page.component';
import NawsRoutePage from '../pages/news/news-route-page.component';
import PlayersListPage from '../pages/players-list/players-list.component';
import PlayerPage from '../pages/player/player.component';
import PlayerProfile from '../pages/player-profile/player-profile.component';
import SignInOut from '../pages/sign-in-out/sign-in-out.component';
//import Throw403 from '../pages/403/throw403.component';

export const DASHBOARD = '/admin/dashboard';
export const EVENT_ROUTE_PAGE = '/event/:id';
export const EVENT_CREATE = '/event/create';
export const EVENT_LISTING = '/events';
export const HOME_PAGE = '/';
export const NEWS_LISTING = '/news';
export const NEWS_ROUTE_PAGE = '/news/:id';
export const NEWS_CREATE = '/news/create';
export const PLAYER_LISTING = '/players-list';
export const PLAYER_PAGE = '/player/:id/character';
export const PLAYER_PROFILE = '/player/:id/profile';
export const SIGN_IN_OUT = '/signin';
//export const Throw403 = '/';

export const componentPaths = {
  dashboard: AdminDashboard,
  eventcreate: EventForm,
  eventlisting: EventListPage,
  eventroutepage: EventRoutePage,
  homepage: HomePage,
  newsarticle: NewsArticle,
  newscreate: NewsForm,
  newslisting: NewsListingPage,
  newsroutepage: NawsRoutePage,
  playerlisting: PlayersListPage,
  playerpage: PlayerPage,
  playerprofile: PlayerProfile,
  signinout: SignInOut
};
