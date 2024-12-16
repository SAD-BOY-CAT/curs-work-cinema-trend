import { FC, useCallback } from "react";
import Column from "../column/column";
import Row from "../row/row";
import { Image, TouchableOpacity } from "react-native";
import Space from "../space/space";
import Text from "../text/text";
import StarSVG from "@/assets/svg/star";
import { fonts } from "@/constants/font";
import { useUser } from "@/hooks/user.hook";
import { useDeleteReviewMutation } from "@/store/api/service/review";
import { CloseSvg } from "@/assets/svg/close";
import { colors } from "@/constants/colors";
import { Role } from "@/store/api/service/user";

type ReviewCardProps = {
  id: number;
  content: string;
  username: string;
  rating: number;
  picture?: string | null;
  ownerId: number;
  role?: Role;
};
const ReviewCard: FC<ReviewCardProps> = ({
  id,
  content,
  username,
  rating,
  picture,
  ownerId,
  role,
}) => {
  const { user } = useUser();
  const userIsOwnerReview = user?.id === ownerId;

  const [deleteReview] = useDeleteReviewMutation();
  const onClick = () => {
    deleteReview({ id });
  };

  return (
    <Column>
      <Row width="100%" vertical="center" horizontal="space-between">
        <Row vertical="center">
          {picture && picture !== "" ? (
            <Image
              style={{ width: 30, height: 30, borderRadius: 40 }}
              source={{ uri: picture }}
            />
          ) : (
            <Image
              style={{ width: 30, height: 30, borderRadius: 40 }}
              source={require("../../assets/images/defualt-user-icon.png")}
            />
          )}
          <Space variant="ROW" space={10} />
          <Text font={fonts.h3}>{username}</Text>
        </Row>
        <Row vertical="center">
          <StarSVG width={15} heigth={15} />
          <Space variant="ROW" space={3} />
          <Text font={fonts.ht1}>{rating}</Text>
          {(userIsOwnerReview || role === Role.MODERATOR) && (
            <>
              <Space variant="ROW" space={3} />
              <TouchableOpacity onPress={onClick}>
                <CloseSvg color={colors.dark.white} />
              </TouchableOpacity>
            </>
          )}
        </Row>
      </Row>
      <Space variant="COLUMN" space={10} />
      <Row width="100%">
        <Text font={fonts.ht2}>{content}</Text>
      </Row>
    </Column>
  );
};

export default ReviewCard;
