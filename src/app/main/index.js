import {memo, useCallback, useEffect} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';

function Main() {

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();
    store.actions.catalog.loadAll();
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    currentPage: state.catalog.currentPage,
    totalItems: state.catalog.totalItems,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <BasketTool onOpen={callbacks.openModalBasket} 
                  amount={select.amount}
                  sum={select.sum}
                  onMainPage={store.actions.catalog.load}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination totalItems={select.totalItems} onPageChange={store.actions.catalog.load}/>
    </PageLayout>

  );
}

export default memo(Main);
