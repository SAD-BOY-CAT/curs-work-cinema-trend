/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/_sitemap` | `/providers/auth-providers` | `/screens/category/category` | `/screens/category/category.props` | `/screens/edit-movie/edit-movie` | `/screens/edit-movie/edit-movie.props` | `/screens/edit-movie/edit-movie.styles` | `/screens/edit-profile/edit-profile` | `/screens/edit-profile/edit-profile.props` | `/screens/edit-profile/edit-profile.styles` | `/screens/favorite/favorite` | `/screens/favorite/favorite.props` | `/screens/genre/genre` | `/screens/genre/genre.props` | `/screens/home/home` | `/screens/home/home.styles` | `/screens/loading/loading` | `/screens/login/login` | `/screens/login/login.props` | `/screens/login/login.styles` | `/screens/movie/movie` | `/screens/movie/movie.props` | `/screens/movie/movie.styles` | `/screens/profile` | `/screens/profile/profile` | `/screens/profile/profile.props` | `/screens/profile/profile.styles` | `/screens/registration/registration` | `/screens/registration/registration.props` | `/screens/registration/registration.styles` | `/screens/watched/watched` | `/screens/watched/watched.props` | `/types` | `/view/flat-container`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
