import React, {useCallback} from 'react';
import List from "./components/list";
import Information from "./components/information";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

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
      [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <Information cart={data.cart}
                totalPriceCart={data.totalPriceCart()}
                onDeleteItemFromCart={callbacks.onDeleteItemFormCart}/>
      <List list={data.list}
            onclickItem={callbacks.onAddItemToCart}/>
    </PageLayout>
  );
}

export default App;
