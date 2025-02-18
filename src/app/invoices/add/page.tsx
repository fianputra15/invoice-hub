import AddInvoicePage from '@/ui/invoices/AddInvoicePage';
import React from 'react';
import type { Metadata } from 'next'


const TITLE = 'Add Invoice';

export const metadata: Metadata = {
  title: `Invoice Hub | ${TITLE}`,
  description: 'Add a new invoice',
}

const Page: React.FC = () => {
  return (
    <AddInvoicePage title={TITLE} />
  );
};

export default Page;