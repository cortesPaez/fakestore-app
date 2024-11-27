import { useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import { useFakeStore } from "../store/fakeStore";
import { Button, Card, Text } from "react-native-paper";

import { FakeStoreService } from "../services/fakeStoreService";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ProductList = () => {
  const navigation = useNavigation();
  const { products, setProducts, setProductSelected, token } = useFakeStore();

  useEffect(() => {
    token === null && navigation.navigate("Sign In");
  }, [token]);

  useQuery("getAllProducts", () => FakeStoreService.getAllProducts(), {
    onSuccess: (data) => {
      if (data) {
        setProducts(data);
      }
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.productContainer}>
            {products.length > 0 ? (
              products?.map(({ title, price, id, image }) => (
                <Card key={id} style={styles.card}>
                  <Card.Title
                    title={title}
                    subtitle={`$${price}`}
                    titleNumberOfLines={3}
                    titleStyle={styles.cardTitle}
                  />
                  <Card.Cover source={{ uri: image }} alt="product" />
                  <Card.Actions>
                    <Button
                      onPress={() => {
                        setProductSelected(id);
                        navigation.navigate("Product Detail");
                      }}
                    >
                      Show Product
                    </Button>
                  </Card.Actions>
                </Card>
              ))
            ) : (
              <Text style={styles.noProductsText}>Products were not found</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    display: "flex",
    gap: 20,
  },
  productContainer: {
    gap: 16,
    marginVertical: 8,
  },
  card: {
    padding: 8,
  },
  cardTitle: {
    fontSize: 20,
  },
  noProductsText: {
    textAlign: "center",
  },
});

export default ProductList;
