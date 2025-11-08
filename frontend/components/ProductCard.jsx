import Link from "next/link";
import Image from "next/image";
export default function ProductCard({ product }) {
  return (
    <div
      style={{ border: "1px solid #eee", padding: "0.5rem", borderRadius: 8 }}
    >
      <Link href={`/product/${product._id}`}>
        <Image
          src={product.images[0] || "/images/placeholder.png"}
          alt={product.name}
          width={300}
          height={300}
        />
        <h4>{product.name}</h4>
      </Link>
      <p>₹{product.price}</p>
    </div>
  );
}
