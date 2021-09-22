import AdminDashboard from '../pages/admin/admin-dashboard.component';
import BadgesPage from '../pages/badges/badges-page.component';
import BadgesForm from '../components/badge/badge-form.component';
import BadgesRoutePage from '../pages/badges/badges-route-page.component';
import EventRoutePage from '../pages/event/event-route-page.component';
import EventForm from '../components/event/form/event-form.component';
import EventListPage from '../pages/event/event-list-page.component';
import HomePage from '../pages/homepage/homepage.component';
import NewsArticle from '../components/news/news.component';
import NewsForm from '../components/news/form/news-form.component';
import NewsListingPage from '../pages/news/news-listing-page.component';
import NawsRoutePage from '../pages/news/news-route-page.component';
import PlayersListPage from '../pages/players-list/players-list.component';
import PlayerProfile from '../pages/player-profile/player-profile.component';
import Rules from '../pages/rules/rules.component';
import SignInOut from '../pages/sign-in-out/sign-in-out.component';
import Throw403 from '../pages/403/throw403.component';

export const BADGES_LISTING = '/badges';
export const BADGE_CREATE = '/badge/create';
export const BADGE_ROUTE_PAGE = '/badge/:id';
export const DASHBOARD = '/admin/dashboard';
export const EVENT_ROUTE_PAGE = '/event/:id';
export const EVENT_CREATE = '/event/create';
export const EVENT_LISTING = '/events';
export const HOME_PAGE = '/';
export const NEWS_LISTING = '/news';
export const NEWS_ROUTE_PAGE = '/news/:id';
export const NEWS_CREATE = '/news/create';
export const PLAYER_LISTING = '/players-list';
export const PLAYER_PROFILE = '/player/:id/profile';
export const SIGN_IN_OUT = '/signin';
export const RULES = '/rules';
export const THROW_403 = '/403';

export const componentPaths = {
  badgecreate: BadgesForm,
  badgeroutepage: BadgesRoutePage,
  badgeslisting: BadgesPage,
  dashboard: AdminDashboard,
  eventcreate: EventForm,
  eventlisting: EventListPage,
  eventroutepage: EventRoutePage,
  fourohthree: Throw403,
  homepage: HomePage,
  newsarticle: NewsArticle,
  newscreate: NewsForm,
  newslisting: NewsListingPage,
  newsroutepage: NawsRoutePage,
  playerlisting: PlayersListPage,
  playerprofile: PlayerProfile,
  rules: Rules,
  signinout: SignInOut
};
