interface InvoiceForm {
  name: string;
  number: number;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "unpaid" | "";
}

export type { InvoiceForm };
