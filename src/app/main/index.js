import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    isLoading: state.catalog.isLoading,
    currentPage: state.catalog.currentPage,
    totalProducts: state.catalog.totalProducts,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Изменение страницы пагинации
    setCurrentPage: useCallback(page => store.actions.catalog.setCurrentPage(page),[store])
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  if (select.isLoading || select.isLoading === null) return <div>Loading...</div>


    return (
    <>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination onClick={callbacks.setCurrentPage}
                  currentPage={parseInt(select.currentPage)}
                  totalPages={Math.ceil(select.totalProducts / 10)}/>
    </>
  );
}

export default memo(Main);
