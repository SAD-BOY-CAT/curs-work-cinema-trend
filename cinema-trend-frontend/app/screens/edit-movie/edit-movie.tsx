import { FC, useEffect, useRef, useState } from "react";
import { EditMovieScreenProps } from "./edit-movie.props";
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "@/constants/colors";
import Header from "@/components/header/header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { InputEvents } from "@/app/types";
import { styles } from "./edit-movie.styles";
import Column from "@/components/column/column";
import Text from "@/components/text/text";
import { fonts } from "@/constants/font";
import Space from "@/components/space/space";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Category, useGetCategoryQuery } from "@/store/api/service/category";
import { getGanre } from "@/constants/categorys";
import { CustomButton } from "@/components/button/button";
import {
  useCreateMovieMutation,
  useGetMovieByIdMutation,
  useUpdateMovieMutation,
} from "@/store/api/service/movie";
import { HomeNavigationProps } from "../movie/movie.props";

export enum MovieScreenType {
  EDIT,
  ADD,
}

type InputMovieProps = {
  title: string;
  url: string;
  description: string;
  country: string;
  duration: string;
  rate: string;
};

export const EditMovie = ({ route }: EditMovieScreenProps) => {
  const { movieId, movieTypeScreen } = route.params;

  const navigation = useNavigation<HomeNavigationProps>();
  const onBack = () => {
    navigation.goBack();
  };

  const [updateMovie] = useUpdateMovieMutation();
  const [getMovieById] = useGetMovieByIdMutation();

  const { data } = useGetCategoryQuery();

  const [genres, setGenres] = useState<Category[]>(data || []);
  const [selectGenres, setSelectGenres] = useState<Category[]>([]);

  const [input, setInput] = useState<InputMovieProps>({
    title: "",
    url: "",
    description: "",
    country: "",
    duration: "",
    rate: "",
  });

  const [validate, setValidate] = useState({
    title: true,
    url: true,
    description: true,
    country: true,
    duration: true,
    rate: true,
    category: true,
  });

  const onValidate = () => {
    const { title, url, description, country, duration, rate } = input;
    const isTitle = title.trim().length > 0;
    const isUrl = url.trim().length > 0;
    const isDescription = description.trim().length > 0;
    const isCountry = country.trim().length > 0;
    const isDuration = isNaN(duration.trim().length) && Number(duration) > 0;
    const isRate = isNaN(rate.trim().length) && Number(rate) > 0;
    const isCategory = selectGenres.length > 0;

    setValidate({
      title: isTitle,
      url: isUrl,
      description: isDescription,
      country: isCountry,
      duration: isDuration,
      rate: isRate,
      category: isCategory,
    });

    return (
      isTitle &&
      isUrl &&
      isDescription &&
      isCountry &&
      isDuration &&
      isRate &&
      isCategory
    );
  };

  const [date, setDate] = useState(new Date());
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const setDataUpdateFilm = async (movieId: number, data: Category[]) => {
    const movie = await getMovieById({ id: movieId });

    if (!movie.data) return;

    const {
      title,
      picture,
      description,
      releaseDate,
      rating,
      duration,
      country,
    } = movie.data;

    const genres = data.filter((item) =>
      movie.data?.categories.includes(item.name)
    );

    setInput({
      title,
      url: picture,
      description,
      rate: rating.toString(),
      duration: duration.toString(),
      country,
    });

    for (let item of genres) {
      onSelectGenre(item);
    }

    setDate(new Date(releaseDate));
  };

  useEffect(() => {
    if (data) setGenres(data);
  }, [data]);

  useEffect(() => {
    if (movieId && genres.length > 0) {
      setDataUpdateFilm(movieId, genres);
    }
  }, []);

  const onSelectGenre = (category: Category) => {
    setGenres((prev) => prev.filter((item) => item.name !== category.name));
    setSelectGenres((prev) => [...prev, category]);
    setValidate((prev) => ({ ...prev, category: true }));
  };

  const onUnselectGenre = (category: Category) => {
    setSelectGenres((prev) => prev.filter((item) => item.id !== category.id));
    setGenres((prev) => [...prev, category].sort((a, b) => a.id - b.id));
  };

  const ref = useRef(null);

  const [genreModal, setGenreModal] = useState<boolean>(false);

  const [createMovie] = useCreateMovieMutation();

  const onSubmit = async () => {
    if (!onValidate()) return;

    if (movieTypeScreen === MovieScreenType.EDIT && movieId) {
      await updateMovie({
        id: movieId,
        title: input.title,
        picture: input.url,
        description: input.description,
        country: input.country,
        duration: Number(input.duration),
        rating: Number(input.rate),
        genres: selectGenres,
        releaseDate: date,
      });
    } else {
      await createMovie({
        title: input.title,
        picture: input.url,
        description: input.description,
        country: input.country,
        duration: Number(input.duration),
        rating: Number(input.rate),
        genres: selectGenres,
        releaseDate: date,
      });
    }
    navigation.navigate("Home");
  };

  return genreModal ? (
    <GenreModal
      onSelectGenre={onSelectGenre}
      genres={genres}
      onClose={() => setGenreModal(false)}
    />
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.dark.backgroud,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
      }}
    >
      <Header
        title={
          movieTypeScreen === MovieScreenType.ADD
            ? "Добавить фильм"
            : "Изменить фильм"
        }
        onBack={onBack}
      />
      <Space variant="COLUMN" space={30} />
      <ScrollView
        style={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Input
          value={input.title}
          title="Название"
          onChange={(text: string) => {
            setValidate((prev) => ({ ...prev, title: true }));
            setInput((prev) => ({ ...prev, title: text }));
          }}
          isError={!validate.title}
          errorText="Поле не должно быть пустым"
        />
        <Space variant="COLUMN" space={5} />
        <Input
          value={input.url}
          title="URL Картинки"
          onChange={(text: string) => {
            setValidate((prev) => ({ ...prev, url: true }));
            setInput((prev) => ({ ...prev, url: text }));
          }}
          isError={!validate.url}
          errorText="Поле не должно быть пустым"
        />
        <Space variant="COLUMN" space={5} />
        <Input
          value={input.description}
          title="Описание"
          onChange={(text: string) => {
            setValidate((prev) => ({ ...prev, description: true }));
            setInput((prev) => ({ ...prev, description: text }));
          }}
          isError={!validate.description}
          errorText="Поле не должно быть пустым"
        />
        <Space variant="COLUMN" space={5} />
        <Input
          value={input.country}
          title="Страна"
          onChange={(text: string) => {
            setValidate((prev) => ({ ...prev, country: true }));
            setInput((prev) => ({ ...prev, country: text }));
          }}
          isError={!validate.country}
          errorText="Поле не должно быть пустым"
        />
        <Space variant="COLUMN" space={5} />
        <Input
          value={input.duration}
          title="Длительность"
          onChange={(text: string) => {
            setValidate((prev) => ({ ...prev, duration: true }));
            setInput((prev) => ({ ...prev, duration: text }));
          }}
          isError={!validate.duration}
          errorText="Поле не должно быть пустым, и иметь числовое значение"
        />
        <Space variant="COLUMN" space={5} />
        <Input
          value={input.rate}
          title="Возрастной рейтинг"
          onChange={(text: string) => {
            setValidate((prev) => ({ ...prev, rate: true }));
            setInput((prev) => ({ ...prev, rate: text }));
          }}
          isError={!validate.rate}
          errorText="Поле не должно быть пустым, и иметь числовое значение"
        />
        <Space variant="COLUMN" space={5} />
        <Column vertical="flex-start" horizontal="flex-start">
          <Text font={fonts.ht2} color={colors.dark.white}>
            Дата релиза
          </Text>
          <Space variant="COLUMN" space={5} />
          <DateTimePicker
            value={date}
            mode="date"
            style={{
              marginLeft: -8,
            }}
            display="default"
            onChange={onChange}
          />
        </Column>
        <Space variant="COLUMN" space={15} />
        <Column vertical="flex-start" horizontal="flex-start">
          <Text font={fonts.ht2} color={colors.dark.white}>
            Жанры
          </Text>
          <Space variant="COLUMN" space={5} />
          <CustomButton
            borderRadius={20}
            width="100%"
            onPress={() => setGenreModal(true)}
            title="Выбрать Жанр"
            height={35}
          />
          {!validate.category && (
            <>
              <Space variant="COLUMN" space={3} />
              <Text font={fonts.ht2} color={colors.dark.error}>
                Должен быть выбран минимум 1 жанр
              </Text>
            </>
          )}
          <Space variant="COLUMN" space={10} />
          <ScrollView
            ref={ref}
            style={{ width: "100%" }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {selectGenres.map((item, index) => (
              <View key={item.id} style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => onUnselectGenre(item)}>
                  <View
                    style={{
                      backgroundColor: colors.dark.shadow,
                      borderRadius: 20,
                      paddingHorizontal: 5,
                      paddingVertical: 3,
                      height: 35,
                    }}
                  >
                    <Text font={fonts.ht1}>{getGanre(item.name)}</Text>
                  </View>
                </TouchableOpacity>
                {index < genres.length - 1 && (
                  <Space variant="ROW" space={10} />
                )}
              </View>
            ))}
          </ScrollView>
        </Column>
      </ScrollView>
      <Space variant="COLUMN" space={15} />
      <CustomButton
        height={35}
        width="100%"
        onPress={onSubmit}
        title="Подтвердить"
        borderRadius={20}
      />
    </View>
  );
};

export type InputProps = {
  value: string;
  onChange: (text: string) => void;
  title: string;
  isError?: boolean;
  errorText?: string;
};

export const Input: FC<InputProps> = ({
  value,
  onChange,
  title,
  isError,
  errorText,
}) => {
  return (
    <Column>
      <Text font={fonts.ht2} color={colors.dark.white}>
        {title}
      </Text>
      <Space variant="COLUMN" space={5} />
      <TextInput style={styles.input} value={value} onChangeText={onChange} />
      {isError && (
        <>
          <Space variant="COLUMN" space={3} />
          <Text font={fonts.ht2} color={colors.dark.error}>
            {errorText}
          </Text>
        </>
      )}
    </Column>
  );
};

type GenreModalProps = {
  onClose: () => void;
  genres: Category[];
  onSelectGenre: (category: Category) => void;
};
const GenreModal: FC<GenreModalProps> = ({
  onClose,
  genres,
  onSelectGenre,
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.dark.backgroud,
        paddingHorizontal: 16,
        paddingTop: 12,
      }}
    >
      <Header title="Выбрать жанр" onBack={onClose} />
      <Space variant="COLUMN" space={10} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={genres}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item) => String(item.id)}
        renderItem={(item) => (
          <>
            <CustomButton
              borderRadius={20}
              height={40}
              onPress={() => onSelectGenre(item.item)}
              title={getGanre(item.item.name) ?? ""}
            />
            <Space space={10} variant="COLUMN" />
          </>
        )}
      />
    </View>
  );
};
