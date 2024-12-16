import ArrowSVG from "@/assets/svg/arrow";
import Row from "@/components/row/row";
import Text from "@/components/text/text";
import { colors } from "@/constants/colors";
import { fonts } from "@/constants/font";
import { FC, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ProfileNavigationProps } from "../profile/profile.props";
import { useNavigation } from "@react-navigation/native";
import Space from "@/components/space/space";
import Column from "@/components/column/column";
import { useUser } from "@/hooks/user.hook";
import { InputEvents } from "@/app/types";
import { styles } from "./edit-profile.styles";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Gender } from "@/store/api/service/user";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

export type EditProfileProps = {};

export const EditProfile: FC<EditProfileProps> = () => {
  const { user, updateUser } = useUser();

  const [inputNameValue, setNameInput] = useState<string>(user?.username || "");
  const onChangeInput = (e: InputEvents) => {
    setNameInput(e.nativeEvent.text);
  };

  const pickImageAndConvertToBase64 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      try {
        const base64Image = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const base64String = `data:image/jpeg;base64,${base64Image}`;
        updateUserInfo({ image: base64String });
      } catch (error) {
        console.error("Ошибка преобразования изображения в Base64:", error);
      }
    } else {
      console.log("Выбор изображения отменён");
    }
  };

  const [select, setSelect] = useState<Gender>(user?.gender || Gender.OTHER);

  const [date, setDate] = useState(
    user?.date ? new Date(user.date) : new Date()
  );
  const [show, setShow] = useState(false);

  const updateUserInfo = async (data?: {
    selectType?: Gender;
    selectDate?: Date;
    image?: string;
  }) => {
    await updateUser({
      username: inputNameValue,
      gender: data?.selectType || select,
      date: data?.selectDate || date,
      picture: data?.image,
    });
  };

  const onRefocus = () => {
    if (inputNameValue === "") {
      setNameInput(user?.username || "user" + user?.id);
    } else {
      updateUserInfo();
    }
  };

  const onChangeSelect = (type: Gender) => {
    setSelect(type);
    updateUserInfo({ selectType: type });
  };

  useEffect(() => {
    setNameInput(user?.username || "user" + user?.id);
  }, []);

  const navigation = useNavigation<ProfileNavigationProps>();
  const onBack = () => {
    navigation.navigate("Profile");
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    updateUserInfo({ selectDate: currentDate });
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
      <Header onBack={onBack} />
      <Space variant="COLUMN" space={20} />
      <ScrollView
        style={{ height: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        <Column vertical="center">
          {user?.picture ? (
            <Image
              source={{
                uri: user?.picture || "",
              }}
              style={{
                borderRadius: 50,
                borderWidth: 1,
                borderColor: colors.dark.primary,
                width: 100,
                height: 100,
              }}
            />
          ) : (
            <Image
              width={100}
              height={100}
              source={require("../../../assets/images/defualt-user-icon.png")}
            />
          )}
          <Space variant="COLUMN" space={10} />
          <TouchableOpacity onPress={pickImageAndConvertToBase64}>
            <Text font={fonts.ht2}>Изменить фото</Text>
          </TouchableOpacity>
        </Column>
        <Space variant="COLUMN" space={20} />
        <Column>
          <Text font={fonts.h2}>О вас</Text>
          <Space variant="COLUMN" space={20} />
          <Text font={fonts.ht2}>Имя</Text>
          <Space variant="COLUMN" space={10} />
          <NameInput
            onEndEditing={onRefocus}
            onChange={onChangeInput}
            value={inputNameValue}
          />
          <Space variant="COLUMN" space={20} />
          <Text font={fonts.ht2}>Пол</Text>
          <Space variant="COLUMN" space={10} />
          <Select startValue={select} onChangeSelect={onChangeSelect} />
          <Space variant="COLUMN" space={20} />
          <Text font={fonts.ht2}>Год рождения</Text>
          <Space variant="COLUMN" space={10} />
          <DateTimePicker
            value={date}
            mode="date"
            style={{
              marginLeft: -8,
            }}
            maximumDate={new Date()}
            minimumDate={new Date("1950-01-01")}
            display="default"
            onChange={onChange}
          />
        </Column>
      </ScrollView>
    </View>
  );
};

type Header = {
  onBack: () => void;
};
const Header = ({ onBack }: Header) => {
  return (
    <Row vertical="center" horizontal="space-between" width="100%">
      <TouchableOpacity onPress={onBack}>
        <ArrowSVG />
      </TouchableOpacity>
      <Row vertical="center" horizontal="center">
        <Row vertical="center" horizontal="center">
          <Text font={fonts.h2}>КИНО</Text>
          <Text color={colors.dark.shadow} font={fonts.h2}>
            ТРЕНД
          </Text>
        </Row>
      </Row>
      <Row></Row>
    </Row>
  );
};

export type NameInputProps = {
  value: string;
  onChange: (e: InputEvents) => void;
  onEndEditing: () => void;
};

export const NameInput: FC<NameInputProps> = ({
  value,
  onChange,
  onEndEditing,
}) => {
  return (
    <TextInput
      style={styles.inputName}
      onBlur={onEndEditing}
      value={value}
      onChange={onChange}
    />
  );
};

export type SelectProps = {
  onChangeSelect: (type: Gender) => void;
  startValue: Gender;
};

export const Select: FC<SelectProps> = ({ startValue, onChangeSelect }) => {
  const inputStyle = StyleSheet.create({
    input: {
      width: "100%",
      height: 30,
      borderRadius: 20,
      backgroundColor: colors.dark.foregound,
      paddingTop: 7,
      paddingHorizontal: 7,
      color: colors.dark.white,
    },
  });

  const onSelectChange = (value: any, index: number) => {
    onChangeSelect(value);
  };

  return (
    <RNPickerSelect
      onValueChange={onSelectChange}
      style={{
        inputAndroidContainer: inputStyle.input,
        inputIOSContainer: inputStyle.input,
        inputWeb: inputStyle.input,
        placeholder: {
          color: colors.dark.white,
        },
        inputIOS: {
          color: colors.dark.white,
        },
        inputAndroid: {
          color: colors.dark.white,
        },
      }}
      items={[
        { label: "Мужской", value: Gender.MALE },
        { label: "Женский", value: Gender.FEMALE },
      ]}
      placeholder={{ label: "Выбрать", value: Gender.OTHER }}
      value={startValue}
      itemKey={startValue}
    />
  );
};
