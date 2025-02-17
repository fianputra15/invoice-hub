import { z } from "zod";

const InvoiceSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  number: z.number().gte(0, { message: "Number must be greater than 0" }),
  dueDate: z.date({ message: "Due date must be a valid date" }),
  amount: z.number().gte(0, { message: "Amount must be greater than or equal to 0" }),
  status: z.enum(['paid', 'pending', 'unpaid'], { message: "Status must be one of 'paid', 'pending', or 'unpaid'" })
});

export {
    InvoiceSchema
}