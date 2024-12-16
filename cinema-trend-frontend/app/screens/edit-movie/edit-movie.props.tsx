import { RootStackParamList } from "@/app/_layout";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

export type EditMovieNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EditMovie"
>;
export type EditMovieScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "EditMovie"
>;
