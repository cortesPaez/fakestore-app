import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from "./screens/SignInScreen";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductList from "./screens/ProductList";
import ProductDetail from "./screens/ProductDetail";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen
            name="Products List"
            component={ProductList}
            options={{ headerBackVisible: false }}
          />
          <Stack.Screen name="Product Detail" component={ProductDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
