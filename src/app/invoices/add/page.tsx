"use client";

import { INVOICE_KEY } from "@/utils/invoice";
import { colors } from "@/utils/muiTheme";
import {
  Box,
  Button,
  Typography,
  Container,
  InputAdornment,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { InvoiceSchema } from "@/lib/schemas/invoices";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/components/PageContainer/PageContainer";
import InputText from "@/components/Input/InputText";
import { useForm } from "react-hook-form";

interface InvoiceForm {
  name: string;
  number: number;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "unpaid" | "";
}

const InvoicesPage = () => {
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit: handleFormSubmit,
    reset,
    register,
  } = useForm<InvoiceForm>({
    defaultValues: {
      name: "",
      number: 0,
      dueDate: "",
      amount: 0,
      status: "",
    },
  });

  const onSubmit = (data: InvoiceForm) => {
    try {
      // Transform and validate the data
      const validatedData = InvoiceSchema.parse({
        name: data.name,
        number: Number(data.number),
        dueDate: new Date(data.dueDate),
        amount: Number(String(data.amount).replace(/\./g, "")),
        status: data.status,
      });

      // If validation passes, save to localStorage
      const existingInvoices = JSON.parse(
        localStorage.getItem(INVOICE_KEY) || "[]"
      );
      localStorage.setItem(
        INVOICE_KEY,
        JSON.stringify([
          ...existingInvoices,
          { ...validatedData, number: `INV${validatedData.number}` },
        ])
      );

      // Clear form
      reset();
      setError(null);
      setOpenAlertSuccess(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(
          `Validation failed: ${err.errors
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", ")}`
        );
      }
    }
  };

  return (
    <PageContainer title="Add Invoice">
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Container maxWidth={false} disableGutters>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          }}
        >
          <Box component="form" onSubmit={handleFormSubmit(onSubmit)}>
            <Box
              p={2}
              sx={{
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  fontWeight: "600",
                }}
              >
                Invoice Form
              </Typography>
            </Box>
            <Box p={2}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  "& > *": {
                    flexBasis: { xs: "100%", sm: "calc(50% - 16px)" },
                  },
                }}
              >
                <InputText
                  label="Name"
                  required
                  placeholder="Enter your invoice name"
                  {...register("name", {
                    required: "Invoice name is required",
                  })}
                />
                <InputText
                  label="Number"
                  required
                  placeholder="Enter your invoice number"
                  {...register("number", {
                    required: "Invoice number is required",
                  })}
                />
                <InputText
                  label="Due Date"
                  required
                  placeholder="Select due date"
                  type="date"
                  {...register("dueDate", {
                    required: "Due date is required",
                  })}
                />
                <InputText
                  label="Amount"
                  required
                  placeholder="Enter your invoice amount"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      sx={{
                        backgroundColor: colors.white02,
                        padding: "0 8px",
                        color: colors.primary,
                      }}
                    >
                      Rp
                    </InputAdornment>
                  }
                  {...register("amount", {
                    required: "Amount is required",
                  })}
                  onChange={(e) => {
                    const value = e.target.value?.replace(/\D/g, "");
                    e.target.value = value
                      ? new Intl.NumberFormat("id-ID").format(Number(value))
                      : "";

                      {}
                  }}
                />
                <Box sx={{ width: "100%" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 1,
                      fontSize: { xs: "12px", sm: "14px" },
                      fontWeight: "500",
                    }}
                  >
                    Status
                  </Typography>
                  <Select
                    required
                    fullWidth
                    displayEmpty
                    defaultValue=""
                    sx={{
                      height: { xs: "40px", sm: "50px" },
                      fontSize: { xs: "12px", sm: "14px" },
                    }}
                    {...register("status", {
                      required: "Status is required",
                    })}
                  >
                    <MenuItem value="" disabled>
                      Select status
                    </MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="unpaid">Unpaid</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </Select>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 4,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    height: { xs: "40px", sm: "50px" },
                    minWidth: { xs: "100%", sm: "150px" },
                    fontSize: "0.75rem",
                  }}
                >
                  + Add Invoice
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        {openAlertSuccess && (
          <Box
            sx={{
              marginTop: "10px",
              background: colors["honeydew"],
              p: 2,
              borderRadius: 1,
              display: "flex",
              gap: 1,
              boxShadow: 3,
              width: "100%",
              borderLeft: `6px solid ${colors["eucalyptus"]}`,
            }}
          >
            <Image
              src="/added-check.svg"
              alt="added-check"
              width={37}
              height={32}
            />
            <Box>
              <Typography
                color="#1b5b4b"
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                variant="subtitle1"
              >
                Invoice added successfully!{" "}
              </Typography>
              <Typography
                color="#82949d"
                sx={{
                  fontSize: "16px",
                  fontWeight: "400",
                }}
                variant="subtitle1"
              >
                You can view and manage your invoice in the{" "}
                <Link href="/invoices/list">My Invoices</Link> page.
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </PageContainer>
  );
};

export default InvoicesPage;
