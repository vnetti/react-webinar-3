import {useCallback, memo, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Loading from "../components/loaders/loading";
import Head from "../components/head";
import Nav from "../components/nav";

export function useTitle(select, store) {

  const [pageTitle, setPageTitle] = useState(null);
  const pathname = useLocation().pathname

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

  return renders
}
