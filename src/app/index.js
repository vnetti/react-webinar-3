import React, {ReactElement, useCallback, useEffect, useState} from "react";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import PageLayout from "../components/page-layout";
import useStore from "../store/use-store";
import {Route, Routes, useLocation} from "react-router-dom";
import Main from "./main";
import Product from "./product";
import Loading from "../components/loaders/loading";
import Head from "../components/head";
import Nav from "../components/nav";

/**
 * Приложение
 * @returns {ReactElement}
 */
function App() {

  const store = useStore()

  const select = useSelector(state => ({
    basketSum: state.basket.sum,
    basketAmount: state.basket.amount,
    activeModal: state.modals.name,
    productTitle: state.product.item.title,
    isLoadingProduct: state.product.isLoading
  }))

  const pathname = useLocation().pathname

  // Закрытие открытых модалок при смене страницы
  useEffect(() => {
    select.activeModal && store.actions.modals.close()
  }, [pathname]);

  // Изменение заголовка страницы в зависимости от подруженного продукта
  const [pageTitle, setPageTitle] = useState(null);
  useEffect(() => {
    select.isLoadingProduct ? setPageTitle(<Loading color={'black'} inscription={'Loading'}/>) :
      pathname.indexOf('/products/') !== -1 ?
        setPageTitle(select.productTitle) :
        setPageTitle('Магазин')
  }, [pathname, select.productTitle, select.isLoadingProduct])

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    head: useCallback(() => {
      return <Head title={pageTitle}/>
    }, [pageTitle]),
    nav: useCallback(() => {
      return <Nav openModalBasket={callbacks.openModalBasket} basketSum={select.basketSum} basketAmount={select.basketAmount}/>
    }, [select]),
  }

  return (
    <>
      <PageLayout nav={renders.nav()}
                  head={renders.head()}>
        <Routes>
          <Route path={'/'} element={<Main/>}/>
          <Route path={'/products/:id'} element={<Product/>}/>

          <Route path={'*'} element={<div>Page not found</div>}/>
        </Routes>
      </PageLayout>
      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
