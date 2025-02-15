import { z } from "zod";

const InvoiceSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    number: z.number().gte(5, { message: "Number must be greater than or equal to 5" }),
    dueDate: z.date({ message: "Due date must be a valid date" }),
    amount: z.number().gte(0, { message: "Amount must be greater than or equal to 0" }),
    status: z.enum(['paid', 'pending', 'overdue'], { message: "Status must be one of 'paid', 'pending', or 'overdue'" }),
  });

export {
    InvoiceSchema
}