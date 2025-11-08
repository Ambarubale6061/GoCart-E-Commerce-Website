import ProductCard from './ProductCard';
export default function ProductList({ products }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '1rem' }}>
      {products.map(p => <ProductCard key={p._id} product={p} />)}
    </div>
  );
}
