import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./home.styles";
import Row from "@/components/row/row";
import Search from "@/components/search/search";
import Space from "@/components/space/space";
import Text from "@/components/text/text";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/font";
import { useCallback, useMemo, useState } from "react";
import { InputEvents } from "@/app/types";
import Column from "@/components/column/column";
import MovieCard from "@/components/movie-card/movie-card";
import { CustomButton } from "@/components/button/button";
import { Movie, useGetMovieBySearchQuery } from "@/store/api/service/movie";
import { useMovie, useMovieMain } from "@/hooks/movie.hook";
import { useDebounce } from "@/hooks/debounce";
import FlatContainer from "@/app/view/flat-container";
import { useNavigation } from "@react-navigation/native";
import { GenerNavigationProp } from "../genre/genre.props";
import { Gener } from "@/constants/categorys";
import { WatchedNavigationProps } from "../watched/watched.props";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from "@/store/api/service/favorite";
import { FavoriteNavigationProps } from "../favorite/favorite.props";
import { ProfileNavigationProps } from "../profile/profile.props";
import HearthSvg from "@/assets/svg/hearth";
import { ProfileIcon } from "@/assets/svg/profile";
import { CategoryNavigationProps } from "../category/category.props";
import { useUser } from "@/hooks/user.hook";
import { AddFilmSvg } from "@/assets/svg/add-film";
import { Role } from "@/store/api/service/user";
import { EditMovieNavigationProp } from "../edit-movie/edit-movie.props";
import { MovieScreenType } from "../edit-movie/edit-movie";

const Home = () => {
  const { newMovies, topMovies, watchedMovies, onWatched } = useMovieMain();
  const { selectMovie } = useMovie();

  const onClickCard = async (id: number) => {
    await onWatched(id);
    await selectMovie(id);
  };

  const [searchValue, setSearchValue] = useState<string>("");
  const { debouncedValue } = useDebounce(searchValue, 500);

  const { data: searchMovie } = useGetMovieBySearchQuery({
    keyword: debouncedValue,
  });

  const searchMovies = useMemo(() => {
    return searchMovie === undefined ? [] : searchMovie;
  }, [searchMovie]);

  const navigate = useNavigation<
    | GenerNavigationProp
    | WatchedNavigationProps
    | FavoriteNavigationProps
    | ProfileNavigationProps
    | CategoryNavigationProps
    | EditMovieNavigationProp
  >();

  const onAddFilm = useCallback(() => {
    navigate.navigate("EditMovie", { movieTypeScreen: MovieScreenType.ADD });
  }, []);

  const onCategory = useCallback(() => {
    navigate.navigate("Category");
  }, []);

  const onGenre = useCallback((genre: Gener) => {
    navigate.navigate("Genre", { gener: genre });
  }, []);

  const onFavoriteScreen = useCallback(() => {
    navigate.navigate("Favorite");
  }, []);

  const onNavigateWatched = useCallback(() => {
    navigate.navigate("Watched");
  }, []);

  const onProfileScreen = useCallback(() => {
    navigate.navigate("Profile");
  }, []);

  const onChangeSearch = useCallback((e: InputEvents) => {
    setSearchValue(e.nativeEvent.text);
  }, []);

  const filteredWatchedMoview = useMemo(() => {
    return watchedMovies.length > 10
      ? [...watchedMovies.slice(0, 10)]
      : [...watchedMovies];
  }, [watchedMovies]);

  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const onFavorite = async (movieId: number, isFavorite: boolean) => {
    if (isFavorite) await deleteFavorite({ movieId: movieId });
    else await addFavorite({ movieId: movieId });
  };

  const { user } = useUser();

  return (
    <View style={styles.container}>
      <Column paddingHorizontal={16} horizontal="center" vertical="center">
        <Header
          onProfileScreen={onProfileScreen}
          onFavoriteScreen={onFavoriteScreen}
          {...(user?.role === Role.MODERATOR && {
            onAddFilm,
          })}
        />
        <Space variant="COLUMN" space={20} />
        <Search onChange={onChangeSearch} value={searchValue} />
        <Space variant="COLUMN" space={20} />
      </Column>
      {debouncedValue === "" ? (
        <ScrollView
          style={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <CardContainer
            onFavorite={onFavorite}
            onClickCard={onClickCard}
            movies={topMovies}
            title="Топ"
          />
          <Space variant="COLUMN" space={30} />
          <CardContainer
            onFavorite={onFavorite}
            onClickCard={onClickCard}
            movies={newMovies}
            title="Новые"
          />
          <Space variant="COLUMN" space={30} />
          <GenresContainer onCategrory={onCategory} onGenre={onGenre} />
          {filteredWatchedMoview.length > 0 && (
            <>
              <Space variant="COLUMN" space={30} />
              <CardContainer
                onFavorite={onFavorite}
                onViewAll={onNavigateWatched}
                onClickCard={onClickCard}
                movies={filteredWatchedMoview}
                title="Просмотренные"
              />
              <Space variant="COLUMN" space={30} />
            </>
          )}
        </ScrollView>
      ) : (
        <FlatContainer
          onFavorite={onFavorite}
          movies={searchMovies}
          onClickCard={onClickCard}
        />
      )}
    </View>
  );
};

type Header = {
  onFavoriteScreen: () => void;
  onProfileScreen: () => void;
  onAddFilm?: () => void;
};
const Header = ({ onFavoriteScreen, onProfileScreen, onAddFilm }: Header) => {
  return (
    <Row vertical="center" horizontal="space-between" width="100%">
      <TouchableOpacity onPress={onFavoriteScreen}>
        <HearthSvg variant="UNFILL" height={24} width={24} />
      </TouchableOpacity>
      <Row
        {...(!!onAddFilm && {
          style: { marginLeft: 40 },
        })}
        vertical="center"
        horizontal="center"
      >
        <Text font={fonts.h2}>КИНО</Text>
        <Space variant="ROW" space={5} />
        <Text color={colors.dark.shadow} font={fonts.h2}>
          ТРЕНД
        </Text>
      </Row>
      <Row vertical="center">
        {!!onAddFilm && (
          <TouchableOpacity onPress={onAddFilm}>
            <AddFilmSvg size={29} />
          </TouchableOpacity>
        )}
        <Space variant="ROW" space={10} />
        <TouchableOpacity onPress={onProfileScreen}>
          <ProfileIcon />
        </TouchableOpacity>
      </Row>
    </Row>
  );
};

type CardContainerProps = {
  title: string;
  movies?: Movie[];
  onClickCard: (id: number) => void;
  onViewAll?: () => void;
  onFavorite: (movieId: number, isFavorite: boolean) => Promise<void>;
};
const CardContainer = ({
  title,
  movies,
  onClickCard,
  onViewAll,
  onFavorite,
}: CardContainerProps) => {
  return (
    <Column horizontal="center" vertical="center">
      <HeaderCard onClick={onViewAll} title={title} />
      <Space variant="COLUMN" space={10} />
      <ScrollView
        style={{ width: "100%", paddingHorizontal: 16 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {movies?.map((movie, index) => (
          <View style={{ flexDirection: "row" }} key={movie.id}>
            <MovieCard
              id={movie.id}
              onFavorite={onFavorite}
              favorite={movie.favorite}
              onClick={() => onClickCard(movie.id)}
              direction="row"
              title={movie.title}
              ganre={movie.categories}
              age={movie.rating}
              rate={movie.averageRating}
              duration={movie.duration}
              picture={movie.picture}
            />
            {index < movies.length - 1 && <Space variant="ROW" space={10} />}
          </View>
        ))}
        <Space space={32} variant="ROW" />
      </ScrollView>
    </Column>
  );
};

type HeaderCardProps = {
  title: string;
  onClick?: () => void;
};

const HeaderCard = ({ title, onClick }: HeaderCardProps) => {
  return (
    <Row
      paddingHorizontal={16}
      width="100%"
      vertical="center"
      horizontal="space-between"
    >
      <Text color={colors.dark.white} font={fonts.h2}>
        {title}
      </Text>
      {!!onClick && (
        <TouchableOpacity onPress={onClick}>
          <Row vertical="center" horizontal="center">
            <Text color={colors.dark.gray} font={fonts.h3}>
              Все
            </Text>
            <Space variant="ROW" space={10} />
            <Image source={require("../../../assets/images/arrow.png")} />
          </Row>
        </TouchableOpacity>
      )}
    </Row>
  );
};

type GenreContainerProps = {
  onGenre: (genre: Gener) => void;
  onCategrory: () => void;
};
const GenresContainer = ({ onGenre, onCategrory }: GenreContainerProps) => {
  return (
    <Column horizontal="center" vertical="center">
      <HeaderCard onClick={onCategrory} title="Жанры" />
      <Space variant="COLUMN" space={10} />
      <Row
        horizontal="center"
        vertical="center"
        paddingHorizontal={16}
        width="100%"
      >
        <CustomButton
          width="48%"
          borderRadius={15}
          height={30}
          onPress={() => onGenre("Drama")}
          title="Драма"
        />
        <Space variant="ROW" space={10} />
        <CustomButton
          width="48%"
          borderRadius={15}
          height={30}
          onPress={() => onGenre("Thriller")}
          title="Триллеры"
        />
      </Row>
      <Space variant="COLUMN" space={10} />
      <Row
        horizontal="center"
        vertical="center"
        paddingHorizontal={16}
        width="100%"
      >
        <CustomButton
          width="48%"
          borderRadius={15}
          height={30}
          onPress={() => onGenre("Action")}
          title="Боевики"
        />
        <Space variant="ROW" space={10} />
        <CustomButton
          width="48%"
          borderRadius={15}
          height={30}
          onPress={() => onGenre("Fantasy")}
          title="Фэнтези"
        />
      </Row>
      <Space variant="COLUMN" space={10} />
      <Row
        horizontal="center"
        vertical="center"
        paddingHorizontal={16}
        width="100%"
      >
        <CustomButton
          width="48%"
          borderRadius={15}
          height={30}
          onPress={() => onGenre("Adventure")}
          title="Приключения"
        />
        <Space variant="ROW" space={10} />
        <CustomButton
          width="48%"
          borderRadius={15}
          height={30}
          onPress={() => onGenre("Animation")}
          title="Мультфильмы"
        />
      </Row>
    </Column>
  );
};

export default Home;
