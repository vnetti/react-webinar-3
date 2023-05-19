import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Information from "./components/information";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isOpenedCart, setIsOpenedCart] = useState(false)

  const data = {
    list: store.getState().list,
    cart: store.getState().cart,
    totalPriceCart() {
      return this.cart.reduce((acc, item) => acc + (item.price * item.count), 0)
    }
  }

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
        store.addItemToCart(code)
      },
      [store]),
    onDeleteItemFormCart: useCallback((code) => {
        store.deleteItemFromCart(code)
      },
      [store]),
    onCloseCart() {
      setIsOpenedCart(false)
    },
    onOpenCart() {
      setIsOpenedCart(true)
    }
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Information cart={data.cart}
                   totalPriceCart={data.totalPriceCart()}
                   onOpenCart={callbacks.onOpenCart}/>
      <List list={data.list}
            onclickItem={callbacks.onAddItemToCart}/>
      <Cart cart={data.cart}
            isOpened={isOpenedCart}
            onClose={callbacks.onCloseCart}
            totalPrice={data.totalPriceCart()}
            onDeleteItemFromCart={callbacks.onDeleteItemFromCart}/>
    </PageLayout>
  );
}

export default App;
