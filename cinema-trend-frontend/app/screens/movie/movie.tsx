import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./movie.styles";
import Column from "@/components/column/column";
import Row from "@/components/row/row";
import Space from "@/components/space/space";
import Text from "@/components/text/text";
import { fonts } from "@/constants/font";
import { colors } from "@/constants/colors";
import { RootStackParamList } from "@/app/_layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { getDurationFormat, getGanre } from "@/constants/categorys";
import ArrowSVG from "@/assets/svg/arrow";
import { useNavigation, useScrollToTop } from "@react-navigation/native";
import { HomeNavigationProps } from "./movie.props";
import StarSVG from "@/assets/svg/star";
import { FC, useRef, useState } from "react";
import AppraisalForm from "@/components/appraisal-form/appraisal-form";
import { Review } from "@/store/api/service/review";
import { useReview } from "@/hooks/review.hook";
import ReviewCard from "@/components/review-card/review-card";
import { useUser } from "@/hooks/user.hook";
import { Role } from "@/store/api/service/user";
import { DeleteSvg } from "@/assets/svg/delete-movie";
import { useDeleteMovieMutation } from "@/store/api/service/movie";
import { EditSvg } from "@/assets/svg/edit";
import { EditMovieNavigationProp } from "../edit-movie/edit-movie.props";
import { MovieScreenType } from "../edit-movie/edit-movie";

type MovieScreenProps = NativeStackScreenProps<RootStackParamList, "Movie">;

const Movie = ({ route }: MovieScreenProps) => {
  const {
    categories,
    title,
    picture,
    releaseDate,
    description,
    review,
    rating,
    duration,
    country,
    id,
  } = route.params.movie;
  const ganre = categories.map((item) => getGanre(item));

  const { onSendReview, reviews, ratingReview, isReviewed } = useReview(id);

  const time = getDurationFormat(duration);

  const navigation = useNavigation<
    HomeNavigationProps | EditMovieNavigationProp
  >();
  const onBack = () => {
    navigation.goBack();
  };

  const { user } = useUser();

  const onSend = async (content: string, rating: number) => {
    await onSendReview(content, rating);
  };

  const [state, setState] = useState<"MOVIE" | "REVIEW">("MOVIE");
  const changeViewState = () => {
    setState(state === "MOVIE" ? "REVIEW" : "MOVIE");
  };

  const [deleteMovie] = useDeleteMovieMutation();

  const onEdit = () => {
    navigation.navigate("EditMovie", {
      movieId: id,
      movieTypeScreen: MovieScreenType.EDIT,
    });
  };

  const onDelete = async () => {
    await deleteMovie(id);
    onBack();
  };

  return state === "MOVIE" ? (
    <MovieView
      onViewAllReview={changeViewState}
      picture={picture}
      reviews={reviews}
      ratingReview={ratingReview}
      rating={rating}
      time={time}
      country={country}
      title={title}
      releaseDate={releaseDate}
      description={description}
      ganre={ganre}
      isReviewed={isReviewed}
      onSend={onSend}
      onBack={onBack}
      role={user?.role ?? Role.USER}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  ) : (
    <ReviewView
      reviews={reviews}
      onSend={onSend}
      isReviewed={isReviewed}
      changeViewState={changeViewState}
      role={user?.role ?? Role.USER}
    />
  );
};

type MovieViewProps = {
  picture: string;
  onBack: () => void;
  reviews: Review[];
  ratingReview: number;
  rating: number;
  time: string;
  country: string;
  title: string;
  releaseDate: string;
  description: string;
  ganre: (string | undefined)[];
  isReviewed: boolean;
  onSend: (content: string, rating: number) => Promise<void>;
  onViewAllReview: () => void;
  role: Role;
  onDelete: () => void;
  onEdit: () => void;
};
const MovieView: FC<MovieViewProps> = ({
  picture,
  onBack,
  onSend,
  reviews,
  ratingReview,
  rating,
  time,
  country,
  title,
  releaseDate,
  description,
  ganre,
  isReviewed,
  onViewAllReview,
  role,
  onDelete,
  onEdit,
}) => {
  const ref = useRef(null);
  useScrollToTop(ref);
  return (
    <ScrollView style={styles().container}>
      <Column>
        <Image
          style={{
            width: "100%",
            height: 475,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
          source={{ uri: picture }}
        />
        <Row
          style={{ position: "absolute", top: 16, paddingHorizontal: 16 }}
          width="100%"
          vertical="center"
          horizontal={role === Role.MODERATOR ? "space-between" : "flex-start"}
        >
          <TouchableOpacity onPress={onBack}>
            <ArrowSVG />
          </TouchableOpacity>
          {role === Role.MODERATOR && (
            <Row vertical="center" horizontal="flex-end">
              <TouchableOpacity onPress={onEdit}>
                <EditSvg size={24} />
              </TouchableOpacity>
              <Space variant="ROW" space={10} />
              <TouchableOpacity onPress={onDelete}>
                <DeleteSvg size={24} color={colors.dark.white} />
              </TouchableOpacity>
            </Row>
          )}
        </Row>
      </Column>
      <Space variant="COLUMN" space={20} />
      <Content
        review={reviews.length}
        averageRating={ratingReview}
        rating={rating}
        time={time}
        country={country}
        title={title}
        releaseDate={releaseDate}
      />
      <ScrollView
        ref={ref}
        style={{ width: "100%", paddingHorizontal: 16 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {ganre.map((item, index) => (
          <View style={{ flexDirection: "row" }} key={index}>
            <View
              style={{
                backgroundColor: colors.dark.shadow,
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 3,
              }}
            >
              <Text font={fonts.ht1}>{item}</Text>
            </View>
            {index < ganre.length - 1 && <Space variant="ROW" space={10} />}
          </View>
        ))}
      </ScrollView>
      <Space variant="COLUMN" space={20} />
      <Column paddingHorizontal={16}>
        <Text>{description}</Text>
      </Column>
      <Space variant="COLUMN" space={30} />
      <ReviewSection
        onViewAllReview={onViewAllReview}
        isReviewed={isReviewed}
        role={role}
        reviews={reviews}
        onSend={onSend}
      />
    </ScrollView>
  );
};

type ContentProps = {
  title: string;
  releaseDate: string;
  averageRating: number;
  rating: number;
  country: string;
  time: string;
  review: number;
};
const Content = ({
  title,
  releaseDate,
  averageRating,
  rating,
  review,
  country,
  time,
}: ContentProps) => {
  return (
    <Column paddingHorizontal={15}>
      <Row width="100%" vertical="center" horizontal="space-between">
        <Row vertical="center">
          <StarSVG width={20} heigth={20} />
          <Space variant="ROW" space={3} />
          <Text font={fonts.ht1}>{averageRating}</Text>
          <Space variant="ROW" space={20} />
          <Text
            color={colors.dark.gray}
            font={fonts.ht2}
          >{`${review} оценки`}</Text>
        </Row>
        <Row vertical="center">
          <Text color={colors.dark.shadow} font={fonts.ht2}>
            {time}
          </Text>
        </Row>
      </Row>
      <Space variant="COLUMN" space={5} />
      <Row width="100%" horizontal="space-between" vertical="center">
        <Row width="80%" vertical="center">
          <Text font={fonts.h2}>{title}</Text>
        </Row>
        <Row width="20%" horizontal="flex-end">
          <Text font={fonts.ht1}>{rating}+</Text>
        </Row>
      </Row>
      <Space variant="COLUMN" space={5} />
      <Row width="100%" horizontal="space-between" vertical="center">
        <Row>
          <Text color={colors.dark.gray} font={fonts.ht2}>
            {new Date(releaseDate).getFullYear()}
          </Text>
        </Row>
        <Row>
          <Text color={colors.dark.gray} font={fonts.ht2}>
            {country}
          </Text>
        </Row>
      </Row>
      <Space variant="COLUMN" space={10} />
    </Column>
  );
};

type ReviewSectionProps = {
  onSend: (content: string, rating: number) => Promise<void>;
  reviews: Review[];
  isReviewed: boolean;
  onViewAllReview: () => void;
  role: Role;
};
const ReviewSection: FC<ReviewSectionProps> = ({
  onSend,
  reviews,
  isReviewed,
  onViewAllReview,
  role,
}) => {
  const filterReview = reviews.length > 2 ? reviews.slice(0, 2) : reviews;

  return (
    <Column paddingHorizontal={15}>
      <Row width="100%" vertical="center" horizontal="space-between">
        <Text font={fonts.h2}>Отзывы</Text>
        <TouchableOpacity onPress={onViewAllReview}>
          <Row vertical="center">
            <Text height="100%" color={colors.dark.gray} font={fonts.h3}>
              Все
            </Text>
            <Space variant="ROW" space={5} />
            <Image source={require("../../../assets/images/arrow.png")} />
          </Row>
        </TouchableOpacity>
      </Row>
      <View style={{ width: "100%" }}>
        <Space variant="COLUMN" space={20} />
        {filterReview.map((item, index) => (
          <View key={index}>
            <ReviewCard
              id={item.id}
              role={role}
              ownerId={item.userId}
              content={item.content}
              username={
                item.user.username !== null
                  ? item.user.username
                  : "user" + item.userId
              }
              rating={item.rating}
              picture={item.user.picture}
            />
            {filterReview.length - 1 > index && (
              <Space variant="COLUMN" space={20} />
            )}
          </View>
        ))}
      </View>
      {!isReviewed && (
        <>
          <Space variant="COLUMN" space={30} />
          <AppraisalForm onSend={onSend} />
        </>
      )}
      <Space variant="COLUMN" space={30} />
    </Column>
  );
};

type ReviewViewProps = {
  changeViewState: () => void;
  onSend: (content: string, rating: number) => Promise<void>;
  isReviewed: boolean;
  reviews: Review[];
  role: Role;
};

const ReviewView: FC<ReviewViewProps> = ({
  changeViewState,
  onSend,
  isReviewed,
  reviews,
  role,
}) => {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        backgroundColor: colors.dark.backgroud,
        paddingTop: 15,
      }}
    >
      <Column heigth="100%" paddingHorizontal={16}>
        <Row vertical="center" horizontal="space-between" width="100%">
          <TouchableOpacity onPress={changeViewState}>
            <ArrowSVG />
          </TouchableOpacity>
          <Row vertical="center" horizontal="center">
            <Text font={fonts.h2}>КИНО</Text>
            <Space variant="ROW" space={5} />
            <Text color={colors.dark.shadow} font={fonts.h2}>
              ТРЕНД
            </Text>
          </Row>
          <Row></Row>
        </Row>
        {!isReviewed && (
          <>
            <Space variant="COLUMN" space={40} />
            <AppraisalForm onSend={onSend} />
          </>
        )}
        <Space variant="COLUMN" space={40} />
        <Row vertical="center">
          <Text font={fonts.h2}>Отзывы</Text>
          <Space variant="ROW" space={5} />
          <Text font={fonts.h2}>{`(${reviews.length})`}</Text>
        </Row>
        <Space variant="COLUMN" space={20} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", paddingBottom: 20 }}
        >
          {reviews.map((item, index) => (
            <View key={index}>
              <ReviewCard
                id={item.id}
                ownerId={item.userId}
                role={role}
                content={item.content}
                username={
                  item.user.username !== null
                    ? item.user.username
                    : "user" + item.userId
                }
                rating={item.rating}
                picture={item.user.picture}
              />
              {reviews.length - 1 > index && (
                <Space variant="COLUMN" space={20} />
              )}
            </View>
          ))}
        </ScrollView>
      </Column>
    </View>
  );
};

export default Movie;
