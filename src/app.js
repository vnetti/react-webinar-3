import React, {useCallback, useState} from 'react';
import List from "./components/list";
import Information from "./components/information";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Item from "./components/item";
import Popup from "./components/popup";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isOpenedCart, setIsOpenedCart] = useState(false)

  const data = {
    list: store.getState().list,
    cart: store.getState().cart.items,
    totalPriceCart: store.getState().cart.totalPrice || 0,
    countCartItems: store.getState().cart.itemsCount || 0,
  }

  const callbacks = {
    onAddItemToCart: useCallback((code) => {
        store.addItemToCart(code)
      },[store]),

    onDeleteItemFromCart: useCallback((code) => {
        store.deleteItemFromCart(code)
      },[store]),

    onCloseCart: useCallback(() => {
      setIsOpenedCart(false)
    }, []),

    onOpenCart: useCallback(() => {
      setIsOpenedCart(true)
    }, [])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Information countCartItems={data.countCartItems}
                   totalPriceCart={data.totalPriceCart}
                   onOpenCart={callbacks.onOpenCart}/>
      <List list={data.list}
            onAddItemToCart={callbacks.onAddItemToCart}>
        <Item/>
      </List>
      <Popup isOpened={isOpenedCart} onClose={callbacks.onCloseCart}>
        <Cart cart={data.cart}
              totalPrice={data.totalPriceCart}
              onDeleteItemFromCart={callbacks.onDeleteItemFromCart}
              isEmptyCart={!data.countCartItems > 0}/>
      </Popup>
    </PageLayout>
  );
}

export default App;
