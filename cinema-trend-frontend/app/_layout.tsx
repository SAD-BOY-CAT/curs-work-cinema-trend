import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login/login";
import Registration from "./screens/registration/registration";
import { Provider } from "react-redux";
import { store } from "@/store";
import AuthProvider, { AuthContext } from "./providers/auth-providers";
import { useContext } from "react";
import Home from "./screens/home/home";
import { useFonts } from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";

import { Movie as MovieProps } from "@/store/api/service/movie";
import Movie from "./screens/movie/movie";
import Loading from "./screens/loading/loading";
import Genre from "./screens/genre/genre";
import { Gener } from "@/constants/categorys";
import { WatchedScreen } from "./screens/watched/watched";
import FavoriteScreen from "./screens/favorite/favorite";
import ProfileScreen from "./screens/profile";
import { EditProfile } from "./screens/edit-profile/edit-profile";
import { CategoryScreen } from "./screens/category/category";
import { EditMovie, MovieScreenType } from "./screens/edit-movie/edit-movie";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <SafeAreaView
          style={{ backgroundColor: colors.dark.backgroud, flex: 1 }}
        >
          <Root />
        </SafeAreaView>
      </AuthProvider>
    </Provider>
  );
};

const Root = () => {
  const context = useContext(AuthContext);
  const [] = useFonts({
    "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("../assets/fonts/Nunito-SemiBold.ttf"),
  });

  return (
    <NavigationContainer independent={true}>
      {context?.state === "SUCCESS" ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Movie" component={Movie} />
          <Stack.Screen name="Genre" component={Genre} />
          <Stack.Screen name="EditMovie" component={EditMovie} />
          <Stack.Screen name="Watched" component={WatchedScreen} />
          <Stack.Screen name="Favorite" component={FavoriteScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Category" component={CategoryScreen} />
        </Stack.Navigator>
      ) : context?.state === "ERROR" || context?.state === "UNAUTORIZATION" ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loading" component={Loading} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Registration: undefined;
  Movie: { movie: MovieProps };
  Loading: undefined;
  Genre: { gener: Gener };
  Watched: undefined;
  Favorite: undefined;
  Profile: undefined;
  EditProfile: undefined;
  Category: undefined;
  EditMovie: { movieTypeScreen: MovieScreenType; movieId?: number };
};

export default Navigation;
