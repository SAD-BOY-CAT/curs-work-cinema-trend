import { AuthContext } from "@/app/providers/auth-providers";
import { CustomButton } from "@/components/button/button";
import Row from "@/components/row/row";
import Space from "@/components/space/space";
import { colors } from "@/constants/colors";
import { useCallback, useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./login.styles";
import { InputEvents } from "@/app/types";
import { useAuth } from "@/hooks/auth.hook";
import { useNavigation } from "@react-navigation/native";
import { RegistrationNavigationProps } from "../registration/registration.props";
import Column from "@/components/column/column";
import { checkValidateEmail } from "@/constants/valideate";

const Login = () => {
  const { login, isError } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation<RegistrationNavigationProps>();
  const OnRegistration = () => {
    navigation.navigate("Registration");
  };

  const [validate, setValidate] = useState({
    email: true,
    password: true,
  });

  const changeEmail = (e: InputEvents) => {
    setValidate((prev) => ({ ...prev, email: true }));
    setEmail(e.nativeEvent.text);
  };

  const changePassword = (e: InputEvents) => {
    setValidate((prev) => ({ ...prev, password: true }));
    setPassword(e.nativeEvent.text);
  };

  const onValidate = () => {
    const isEmail = email.trim().length > 0 && checkValidateEmail(email);
    const isPassword = password.trim().length > 0;
    setValidate({
      email: isEmail,
      password: isPassword,
    });

    return isEmail && isPassword;
  };

  const onLogin = useCallback(() => {
    if (onValidate()) {
      login(email, password);
    }
  }, [email, password, onValidate]);

  useEffect(() => {
    setValidate({
      email: true,
      password: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.surface}>
        <Text style={styles.title}>Авторизация</Text>
        <Space variant="COLUMN" space={40} />
        <Column>
          <Row style={{ position: "relative", width: "100%" }}>
            <TextInput
              onChange={changeEmail}
              defaultValue={email}
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
              onChange={changePassword}
              defaultValue={password}
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
          {isError && (
            <Text style={{ color: colors.dark.error, fontSize: 10 }}>
              Неверное имя пользователя или пароль
            </Text>
          )}
        </Column>
        <Space variant="COLUMN" space={10} />
        {/* <Row width="100%" style={{ width: "100%" }} horizontal="flex-end">
          <TouchableOpacity>
            <Text style={{ color: colors.dark.text, fontSize: 10 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </Row> */}
        <Space variant="COLUMN" space={20} />
        <CustomButton
          onPress={onLogin}
          width={200}
          height={36}
          borderRadius={20}
          title="Войти"
        />
        <Space variant="COLUMN" space={40} />
        <TouchableOpacity onPress={OnRegistration}>
          <Text style={{ color: colors.dark.text, fontSize: 14 }}>
            Нет акаунта? Зарегистрируйтесь!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
