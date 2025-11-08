import Image from 'next/image';
export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
  if (res.status !== 200) return { notFound: true };
  const product = await res.json();
  return { props: { product } };
}

export default function ProductPage({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <div>
        {product.images?.map((src, i) => (
          <Image key={i} src={src} alt={product.name} width={400} height={400} />
        ))}
      </div>
      <p>{product.description}</p>
      <strong>₹{product.price}</strong>
    </div>
  );
}
