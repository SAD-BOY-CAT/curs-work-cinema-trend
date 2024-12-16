import { colors } from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { GenerScreenProps } from "./genre.props";
import { HomeNavigationProps } from "../movie/movie.props";
import { getGanre } from "@/constants/categorys";
import { useGetMovieByGenreQuery } from "@/store/api/service/movie";
import { useMovie } from "@/hooks/movie.hook";
import { useMemo } from "react";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from "@/store/api/service/favorite";

import Space from "@/components/space/space";
import FlatContainer from "@/app/view/flat-container";
import Header from "@/components/header/header";

const Genre = ({ route }: GenerScreenProps) => {
  const navigation = useNavigation<HomeNavigationProps>();
  const onBack = () => {
    navigation.goBack();
  };

  const { data } = useGetMovieByGenreQuery({ genre: route.params.gener });
  const { selectMovie, onWatched } = useMovie();

  const movies = useMemo(() => (data ? data : []), [data]);

  const onClickCard = async (id: number) => {
    await onWatched({ movieId: id });
    await selectMovie(id);
  };

  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const onFavorite = async (movieId: number, isFavorite: boolean) => {
    if (isFavorite) await deleteFavorite({ movieId: movieId });
    else await addFavorite({ movieId: movieId });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.dark.backgroud,
        paddingHorizontal: 16,
        paddingTop: 12,
      }}
    >
      <Header title={getGanre(route.params.gener) || ""} onBack={onBack} />
      <Space variant="COLUMN" space={10} />
      <FlatContainer
        onFavorite={onFavorite}
        movies={movies}
        onClickCard={onClickCard}
      />
    </View>
  );
};

export default Genre;
