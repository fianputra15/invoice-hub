"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Menu,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import PageContainer from "@/components/PageContainer/PageContainer";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useInvoices from "@/hooks/useInvoices";

interface Invoice {
  name: string;
  number: number;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "unpaid";
}

const InvoicesListPage = ({ title }: { title: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const {
    filteredInvoices,
    searchTerm,
    statusFilter,
    selectedInvoice,
    handleSearch,
    handleStatusFilter,
    handleDeleteInvoice,
    handleSelectInvoice,
  } = useInvoices(searchParams);

  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const updateSearchParams = (search: string, status: string) => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (status && status !== "all") params.set("status", status);

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleDialogOpen = (invoice: Invoice) => {
    handleSelectInvoice(invoice);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    handleSelectInvoice(null);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    invoice: Invoice
  ) => {
    handleSelectInvoice(invoice);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleSelectInvoice(null);
  };

  const handleDeleteInvoiceList = async () => {
    await handleDeleteInvoice();
    handleDialogClose();
  };

  return (
    <>
      <PageContainer
        title={title}
        subChildren={
          <Box
            sx={{
              display: "flex",
              gap: 2,
              width: { xs: "100%", lg: "auto" },
              flexWrap: "wrap",
            }}
          >
            <TextField
              placeholder="Search"
              size="small"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleSearch(e);
                updateSearchParams(e.target.value, statusFilter);
              }}
              sx={{ width: { xs: "100%", sm: "200px", lg: "200px" } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl
              size="small"
              sx={{ minWidth: { xs: "100%", sm: "100%", lg: "120px" } }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => {
                  handleStatusFilter(e);
                  updateSearchParams(searchTerm, e.target.value);
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="unpaid">Unpaid</MenuItem>
              </Select>
            </FormControl>
          </Box>
        }
      >
        <Box
          sx={{
            p: 4,
            backgroundColor: "white",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: { xs: "100%", md: "650px" },
                border: "none",
                overflow: "scroll",
              }}
              aria-label="invoice table"
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#f8f9fc",
                  }}
                >
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Invoice
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Due Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Amount
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.number}>
                    <TableCell
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "#5c626d",
                        }}
                      >
                        {invoice.name}
                      </Box>
                      <Box
                        component="span"
                        sx={{ fontSize: "14px", color: "#aaabb1" }}
                      >
                        {invoice.number}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor:
                            invoice.status === "paid"
                              ? "#edf7f1"
                              : invoice.status === "pending"
                                ? "#fff8ec"
                                : "#fbf0f1",
                          color:
                            invoice.status === "paid"
                              ? "#065F46"
                              : invoice.status === "pending"
                                ? "#78350F"
                                : "#7F1D1D",
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          display: "inline-block",
                          textTransform: "capitalize",
                          fontSize: "0.875rem",
                        }}
                      >
                        {invoice.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(invoice.amount)}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleMenuClick(event, invoice)}
                      >
                        <Image
                          src="/collapse-menu.svg"
                          alt="collapse-menu"
                          width={18}
                          height={12}
                        />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MuiMenuItem
                          onClick={() =>
                            handleDialogOpen(selectedInvoice!)
                          }
                        >
                          <DeleteIcon sx={{ color: "red" }} /> Delete
                        </MuiMenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredInvoices.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      No invoices found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Delete Invoice</DialogTitle>
          <DialogContent>
            <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600" }}
              >
                Are you sure you want to delete this invoice{" "}
                {selectedInvoice?.number}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteInvoiceList} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </PageContainer>
    </>
  );
};

export default InvoicesListPage;
