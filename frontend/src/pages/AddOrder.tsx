import { useEffect, useState } from "react";
import { addOrder, getProducts } from "../api";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

interface IProduct {
  id: number;
  productname: string;
  productdescription: string;
}

export default function AddOrder() {
  const [orderDescription, setDesc] = useState("");
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await addOrder({ orderDescription, productIds: selectedProducts }).then(
      (res) => {
        if (res.ok) {
          setIsLoading(false);
          navigate("/");
        } else {
          alert("Failed to book order");
          setIsLoading(false);
        }
      }
    );
  };

  const loadProductsList = async () => {
    const products = await getProducts();
    setIsLoading(false);
    setProducts(products);
  };

  useEffect(() => {
    loadProductsList();
  }, []);

  const handleSelect = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 40, border: "1px solid #ccc", borderRadius: 4 }}>
      <h2>Book Order</h2>

      <input
        placeholder="Order Description"
        value={orderDescription}
        onChange={(e) => setDesc(e.target.value)}
      />

      <br />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ccc",
              padding: 1,
              marginBottom: 1,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <input type="checkbox" onChange={() => handleSelect(p.id)} />
            <ProductCard
              productname={p.productname}
              productdescription={p.productdescription}
            />
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={handleSubmit}>Book Order</button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
}
