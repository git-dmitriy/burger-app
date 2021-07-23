export const listProducts = async () => {
  const response = await fetch('/api/products');
  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong');
};
