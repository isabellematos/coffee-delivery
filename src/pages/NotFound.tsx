import { EmptyCart } from '../components/EmptyCart';
import { PageLayout } from '../components/PageLayout';

export function NotFound() {
  return (
    <PageLayout>
      <EmptyCart title="Página não encontrada" description="O endereço que você tentou acessar não existe." />
    </PageLayout>
  );
}
