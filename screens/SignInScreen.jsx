import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { FakeStoreService } from "../services/fakeStoreService";
import { useQuery } from "react-query";
import { useFakeStore } from "../store/fakeStore";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [errorText, setErrorText] = useState("");
  const { setToken } = useFakeStore();
  const [inputText, setInputText] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputText;

  const onChange = (name, value) => {
    setInputText((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, error, isLoading, refetch } = useQuery(
    "login",
    () => FakeStoreService.auth(inputText),
    {
      enabled: false,
      onSuccess: (data) => {
        if (data.token) {
          setToken(data.token);
          navigation.navigate("Products List");
        } else {
          setErrorText(data);
        }
      },
      onError: () => {
        setErrorText(data);
      },
    }
  );

  const handleLogin = () => {
    if (username === "" || password === "") {
      setErrorText("Empty username or password");
    } else {
      setErrorText("");
      refetch();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In FakeStore</Text>
      <TextInput
        style={styles.input}
        label="Username"
        value={username}
        onChangeText={(text) => onChange("username", text)}
        error={error || errorText?.length > 0}
        onBlur={() => setErrorText("")}
      />
      <TextInput
        style={styles.input}
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => onChange("password", text)}
        error={error || errorText?.length > 0}
        onBlur={() => setErrorText("")}
      />
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
      <Button mode="contained" onPress={handleLogin} loading={isLoading}>
        Iniciar sesión
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: "100%",
    display: "flex",
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
  },
  errorText: {
    color: "#B3271C",
  },
});

export default SignInScreen;
