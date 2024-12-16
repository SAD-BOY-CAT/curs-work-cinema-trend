const ganres = new Map([
    ["Action", "Боевик"],
    ["Adventure", "Приключения"],
    ["Animation", "Анимация"],
    ["Comedy", "Комедия"],
    ["Drama", "Драма"],
    ["Fantasy", "Фантастика"],
    ["Horror", "Ужасы"],
    ["Romance", "Роматика"],
    ["Science Fiction", "Нучный"],
    ["Thriller", "Трийлер"],
    ["Documentary", "Документальный"],
])

export type Gener = "Action" | "Adventure" | "Animation" | "Comedy" | "Drama" | "Fantasy" | "Horror" | "Romance" | "Science Fiction" | "Thriller" | "Documentary";

export const getGanre = (ganre: string) => {
   return ganres.get(ganre)
}

export const getDurationFormat = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    return `${hours} ч ${minutes} мин`;
};