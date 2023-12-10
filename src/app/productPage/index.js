import {memo, useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Product from '../../components/product';
import { useParams } from 'react-router-dom';
import Basket from '../basket';

function ProductPage() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    store.actions.product.load(id);
  }, [id]); 

  const select = useSelector( state => ({
    title: state.product.title,
    description: state.product.description,
    madeIn: state.product.madeIn,
    category: state.product.category,
    edition: state.product.edition,
    price: state.product.price,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const activeModal = useSelector(state => state.modals.name);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback( () => store.actions.basket.addToBasket(id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  return (
    <>
    <PageLayout>
      <Head title={select.title}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum}/>
      <Product description={select.description}
               madeIn={select.madeIn}
               category={select.category}
               edition={select.edition}
               price={select.price}
               onAdd={callbacks.addToBasket}/>
    </PageLayout>
    {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default memo(ProductPage);
