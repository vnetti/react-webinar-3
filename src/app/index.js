import {ReactElement, useEffect} from "react";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import PageLayout from "../components/page-layout";
import useStore from "../store/use-store";
import {useTitle} from "./use-title";
import {Router} from "./router";
import {useLocation} from "react-router-dom";

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

  const path = useLocation().pathname

  useEffect(() => {
    store.actions.modals.close()
  }, [path]);

  const {head, nav} = useTitle(select, store)

  return (
    <>
      <PageLayout nav={nav()}
                  head={head()}>
        <Router/>
      </PageLayout>
      {select.activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
