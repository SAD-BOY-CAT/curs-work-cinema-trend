import { RootStackParamList } from "@/app/_layout";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

export type GenerNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Genre'>;
export type GenerScreenProps = NativeStackScreenProps<RootStackParamList, 'Genre'>;