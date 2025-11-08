import ProductList from '../components/ProductList';
import axios from 'axios';

export async function getStaticProps() {
  // SSG for home
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=12`);
  const data = await res.json();
  return { props: { products: data.products || [] }, revalidate: 60 };
}

export default function Home({ products }) {
  return (
    <div>
      <h1>GoCart — Home</h1>
      <ProductList products={products} />
    </div>
  );
}
