import { TITLE } from '@/constants/addInvoices';
import InvoicesListPage from '@/ui/invoices/InvoiceListPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: `Invoice Hub | ${TITLE}`,
  description: 'List of all invoices',
}

const Page: React.FC = () => {
  return (
    <InvoicesListPage title={TITLE} />
  );
};

export default Page;