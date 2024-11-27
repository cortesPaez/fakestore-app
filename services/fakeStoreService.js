const auth = async (body) => {
  try {
    const res = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 404) {
      console.error("Error service");
      throw new Error("Endpoint unexist");
    }
    if (!res.ok && res.status === 401) {
      return res.text();
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getAllProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const FakeStoreService = {
  auth,
  getAllProducts,
};
