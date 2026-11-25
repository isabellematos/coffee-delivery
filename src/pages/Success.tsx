import { EmptyCart } from '../components/EmptyCart';
import { OrderSuccess } from '../components/OrderSuccess';
import { PageLayout } from '../components/PageLayout';
import { loadOrder } from '../utils/order';

export function Success() {
  const order = loadOrder();
  return (
    <PageLayout>
      {order ? (
        <OrderSuccess order={order} />
      ) : (
        <EmptyCart title="Nenhum pedido encontrado" description="Faça um pedido para ver a confirmação aqui." />
      )}
    </PageLayout>
  );
}
