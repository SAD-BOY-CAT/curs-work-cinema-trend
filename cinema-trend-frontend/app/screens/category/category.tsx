import Header from "@/components/header/header";
import Space from "@/components/space/space";
import { colors } from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";
import { FC, useMemo } from "react";
import { FlatList, View } from "react-native";
import { HomeNavigationProps } from "../movie/movie.props";
import { useGetCategoryQuery } from "@/store/api/service/category";
import { CustomButton } from "@/components/button/button";
import { GenerNavigationProp } from "../genre/genre.props";
import { Gener, getGanre } from "@/constants/categorys";

type Props = {};

export const CategoryScreen: FC<Props> = () => {
  const navigation = useNavigation<HomeNavigationProps | GenerNavigationProp>();
  const onBack = () => {
    navigation.navigate("Home");
  };

  const onGener = (gener: Gener) => {
    navigation.navigate("Genre", { gener: gener });
  };

  const { data } = useGetCategoryQuery();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.dark.backgroud,
        paddingHorizontal: 16,
        paddingTop: 12,
      }}
    >
      <Header title="Жанры" onBack={onBack} />
      <Space variant="COLUMN" space={10} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(item) => String(item.id)}
        renderItem={(item) => (
          <>
            <CustomButton
              borderRadius={20}
              height={40}
              onPress={() => onGener(item.item.name)}
              title={getGanre(item.item.name) ?? ""}
            />
            <Space space={10} variant="COLUMN" />
          </>
        )}
      />
    </View>
  );
};
