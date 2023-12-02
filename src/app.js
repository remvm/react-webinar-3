import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from './components/cart';
import ModalLayout from './components/modal-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const cart = store.getState().cart;
  const isModalOpen = store.getState().isModalOpen;
  const cartSum = store.getState().cartSum

  const callbacks = {
    onAddItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code)
    }, [store]),

    onShowCart: useCallback(() => {
      store.showCart();
    }, [store]),

    onHideCart: useCallback(() => {
      store.hideCart();
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <ModalLayout isOpen={isModalOpen}>
        <Cart onHideCart={callbacks.onHideCart}
              onDeleteItem={callbacks.onDeleteItem}
              cartItems={cart}
              cartSum={cartSum}/>
      </ModalLayout>
      <Controls cart={cart} 
                onShowCart={callbacks.onShowCart}
                store={store}/>
      <List list={list}
            action={callbacks.onAddItem}
            text={'Добавить'}/>
    </PageLayout>
  );
}

export default App;
