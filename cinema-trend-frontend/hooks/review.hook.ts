import { useCreateReviewMutation, useGetReviewQuery } from "@/store/api/service/review";
import { useUser } from "./user.hook";
import { useMemo } from "react";

export const useReview = (movieId: number) => {
    const [createReview, { }] = useCreateReviewMutation();
    const { data } = useGetReviewQuery({ id: movieId });

    const { user } = useUser();

    const onSendReview = async (content: string, rating: number) => {
        const review = await createReview({
            movieId: movieId, 
            content: content, 
            rating: rating,
        })
    }

    const reviews = useMemo(() => Array.isArray(data) ? [...data].reverse() : [], [data]);


    const ratingReview = useMemo(() => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((acc, item) => acc + item.rating, 0);
        return totalRating / reviews.length;
    }, [reviews]);


    const isReviewed = useMemo(() => reviews.some((item) => item.userId === user?.id), [reviews]);


    return {
        onSendReview: onSendReview,
        reviews: reviews,
        ratingReview: Number(ratingReview.toFixed(1)),
        isReviewed: isReviewed,
    }
}