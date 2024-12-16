import MovieCard from "@/components/movie-card/movie-card";
import { Movie } from "@/store/api/service/movie";
import { FC } from "react";
import { FlatList } from "react-native";

type FlatContainerProps = {
    movies: Movie[];
    onClickCard: (id: number) => void;
    onFavorite: (movieId: number, isFavorite: boolean) => Promise<void>;
}

const FlatContainer: FC<FlatContainerProps> = ({ movies, onClickCard, onFavorite }) => {
    
return (
        <FlatList
            data={movies}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ marginBottom: 10, justifyContent: "center", columnGap: 10, }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(item) => String(item.id)}
            renderItem={(movie) =>
                <MovieCard
                    id={movie.item.id}
                    onFavorite={onFavorite}
                    favorite={movie.item.favorite}
                    onClick={() => onClickCard(movie.item.id)}
                    direction="column"
                    title={movie.item.title}
                    ganre={movie.item.categories}
                    age={movie.item.rating}
                    rate={movie.item.averageRating}
                    duration={movie.item.duration}
                    picture={movie.item.picture}
                />}
        />
    )
}

export default FlatContainer;
