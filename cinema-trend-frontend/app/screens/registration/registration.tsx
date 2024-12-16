import { CustomButton } from "@/components/button/button";
import Row from "@/components/row/row";
import Space from "@/components/space/space";
import { useCallback, useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./registration.styles";
import { useAuth } from "@/hooks/auth.hook";
import { useNavigation } from "@react-navigation/native";
import { LoginNavigationProps } from "../login/login.props";
import { colors } from "@/constants/colors";
import { checkValidateEmail } from "@/constants/valideate";
import Column from "@/components/column/column";

const Registration = () => {
  const { registration, regSuccess, registrationError } = useAuth();

  const [input, setInput] = useState({
    email: "",
    password: "",
    validatePassword: "",
  });

  const [validate, setValidate] = useState({
    email: true,
    password: true,
    validatePassword: true,
  });

  const onValidate = () => {
    const isEmail =
      input.email.trim().length > 0 && checkValidateEmail(input.email);
    const isPassword = input.password.trim().length > 0;
    const isValidatePassword = input.validatePassword === input.password;
    if (input.password !== input.validatePassword) {
      setValidate((prev) => ({ ...prev, validatePassword: false }));
      return false;
    }

    setValidate({
      email: isEmail,
      password: isPassword,
      validatePassword: isValidatePassword,
    });

    return isEmail && isPassword && isValidatePassword;
  };

  const navigation = useNavigation<LoginNavigationProps>();

  const onRegistration = useCallback(() => {
    if (onValidate()) {
      registration({ email: input.email, password: input.password });
    }
  }, [input]);

  console.log(regSuccess);
  useEffect(() => {
    if (regSuccess) {
      navigation.navigate("Login");
    }
  }, [regSuccess]);

  useEffect(() => {
    setValidate({
      email: true,
      password: true,
      validatePassword: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.surface}>
        <Text style={styles.title}>Регистрация</Text>
        <Space variant="COLUMN" space={40} />
        <Column>
          <Row style={{ position: "relative", width: "100%" }}>
            <TextInput
              onChangeText={(text) => {
                setValidate((prev) => ({ ...prev, email: true }));
                setInput((prev) => ({ ...prev, email: text }));
              }}
              defaultValue={input.email}
              placeholder="Email"
              style={styles.input}
            />
            <Image
              style={{ position: "absolute", top: 8, left: 15 }}
              source={require("../../../assets/images/email-icon.png")}
            />
          </Row>
          <Space variant="COLUMN" space={3} />
          {!validate.email && (
            <Text style={{ color: colors.dark.error, fontSize: 10 }}>
              Введите валидную почту
            </Text>
          )}
        </Column>
        <Space variant="COLUMN" space={10} />
        <Column>
          <Row style={{ position: "relative", width: "100%" }}>
            <TextInput
              onChangeText={(text) => {
                setValidate((prev) => ({ ...prev, password: true }));
                setInput((prev) => ({ ...prev, password: text }));
              }}
              defaultValue={input.password}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
            <Image
              style={{ position: "absolute", top: 8, left: 15 }}
              source={require("../../../assets/images/password-icon.png")}
            />
          </Row>
          <Space variant="COLUMN" space={3} />
          {!validate.password && (
            <Text style={{ color: colors.dark.error, fontSize: 10 }}>
              Поле пароль не должно быть пустым
            </Text>
          )}
        </Column>
        <Space variant="COLUMN" space={10} />
        <Column>
          <Row style={{ position: "relative", width: "100%" }}>
            <TextInput
              onChangeText={(text) => {
                setValidate((prev) => ({ ...prev, validatePassword: true }));
                setInput((prev) => ({ ...prev, validatePassword: text }));
              }}
              defaultValue={input.validatePassword}
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
            <Image
              style={{ position: "absolute", top: 8, left: 15 }}
              source={require("../../../assets/images/password-icon.png")}
            />
          </Row>
          <Space variant="COLUMN" space={3} />
          {!validate.validatePassword && (
            <Text style={{ color: colors.dark.error, fontSize: 10 }}>
              Пароли должны совпадать
            </Text>
          )}
          {registrationError && (
            <Text style={{ color: colors.dark.error, fontSize: 10 }}>
              Ошибка регистрации
            </Text>
          )}
        </Column>
        <Space variant="COLUMN" space={20} />
        <CustomButton
          onPress={onRegistration}
          width={200}
          height={36}
          borderRadius={20}
          title="Зарегистрироваться"
        />
        <Space variant="COLUMN" space={20} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: colors.dark.text, fontSize: 14 }}>
            Есть акаунт? Авторизуйтесь!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registration;
