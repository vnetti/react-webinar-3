import {memo, useCallback, useEffect} from 'react';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import {useParams} from "react-router-dom";
import ProductCard from "../../components/product-card";

function Product() {

  const store = useStore();

  const select = useSelector(state => ({
    isLoading: state.product.isLoading,
    item: state.product.item
  }));

  const {id: productId} = useParams()

  useEffect(() => {
    store.actions.product.getById(productId);
    return () => store.actions.product.clearProduct()
  }, [productId]);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
  }

  return (
    <>
      {select.isLoading || select.isLoading === null ?
        <div>Loading...</div> :
        <ProductCard onClick={callbacks.addToBasket} card={select.item}/>}
    </>
  );
}

export default memo(Product);
