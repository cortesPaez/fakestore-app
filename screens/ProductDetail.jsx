import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useFakeStore } from "../store/fakeStore";
import { Avatar, Text } from "react-native-paper";

const ProductDetail = () => {
  const { products, productSelected, token } = useFakeStore();

  useEffect(() => {
    token === null && navigation.navigate("Sign In");
  }, []);

  return (
    <>
      {products
        ?.filter(({ id }) => id === productSelected)
        .map(({ title, price, description, image, id }) => (
          <View key={id} style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                alt="product"
                source={{ uri: image }}
                style={styles.image}
              />
              <Avatar.Text
                size={20}
                style={styles.priceTag}
                label={`$${price}`}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  priceTag: {
    height: 20,
    width: 50,
    fontSize: 6,
    position: "absolute",
    bottom: 20,
  },
  textContainer: {
    marginTop: 16,
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "justify",
  },
});

export default ProductDetail;
