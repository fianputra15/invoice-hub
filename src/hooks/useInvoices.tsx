import { useState, useEffect, useCallback } from "react";
import { INVOICE_KEY } from "@/utils/invoice";
import { SelectChangeEvent } from "@mui/material/Select";


interface Invoice {
  name: string;
  number: number;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "unpaid";
}

const useInvoices = (searchParams: URLSearchParams) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    return searchParams.get("search") || "";
  });
  const [statusFilter, setStatusFilter] = useState<string>(() => {
    return searchParams.get("status") || "";
  });

  useEffect(() => {
    const savedInvoices = localStorage.getItem(INVOICE_KEY);
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
      setFilteredInvoices(JSON.parse(savedInvoices));
    }
  }, []);

  const filterInvoices = useCallback(
    (search: string, status: string) => {
      let filtered = invoices;

      if (search) {
        filtered = filtered.filter(
          (invoice) =>
            invoice.name.toLowerCase().includes(search) ||
            invoice.number.toString().includes(search)
        );
      }

      if (["paid", "pending", "unpaid"].includes(status)) {
        filtered = filtered.filter((invoice) => invoice.status === status);
      }

      setFilteredInvoices(filtered);
    },
    [invoices]
  );

  useEffect(() => {
    filterInvoices(searchTerm, statusFilter);
  }, [searchTerm, statusFilter, invoices, filterInvoices]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  const handleStatusFilter = (event: SelectChangeEvent<string>) => {
    const status = event.target.value;
    setStatusFilter(status);
  };

  const handleDeleteInvoice = () => {
    // Logic for deleting the invoice
    const existingInvoices = JSON.parse(
      localStorage.getItem(INVOICE_KEY) || "[]"
    );
    const updatedInvoices = existingInvoices.filter(
      (inv: Invoice) => inv.number !== selectedInvoice!.number
    );
    localStorage.setItem(INVOICE_KEY, JSON.stringify(updatedInvoices));
    setInvoices(updatedInvoices);
    setFilteredInvoices(updatedInvoices);
  };

  const handleSelectInvoice = (invoice: Invoice | null) => {
    setSelectedInvoice(invoice);
  }

  return {
    invoices,
    filteredInvoices,
    searchTerm,
    statusFilter,
    selectedInvoice,
    handleSearch,
    handleStatusFilter,
    handleDeleteInvoice,
    handleSelectInvoice
  };
};

export default useInvoices;
