"use client";

import React, { useEffect, useState } from "react";
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
  DialogContentText,
  DialogTitle,
  Button,
  Menu,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { INVOICE_KEY } from "@/utils/invoice";
import { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";
import PageContainer from "@/components/PageContainer/PageContainer";

interface Invoice {
  name: string;
  number: number;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "unpaid";
}

const InvoicesListPage = () => {
  const params = new URLSearchParams(window.location.search);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState(params.get("search") || "");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "delete" | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const savedInvoices = localStorage.getItem(INVOICE_KEY);
    if (savedInvoices) {
      setInvoices(JSON.parse(savedInvoices));
      setFilteredInvoices(JSON.parse(savedInvoices));
    }
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterInvoices(term, statusFilter);
    updateSearchParams(term, statusFilter);
  };

  const handleStatusFilter = (event: SelectChangeEvent<string>) => {
    const status = event.target.value;
    setStatusFilter(status);
    filterInvoices(searchTerm, status);
    updateSearchParams(searchTerm, status);
  };

  const filterInvoices = (search: string, status: string) => {
    let filtered = invoices;

    if (search) {
      filtered = filtered.filter(
        (invoice) =>
          invoice.name.toLowerCase().includes(search) ||
          invoice.number.toString().includes(search)
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((invoice) => invoice.status === status);
    }

    setFilteredInvoices(filtered);
  };

  const updateSearchParams = (search: string, status: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status !== "all") params.set("status", status);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  const handleDialogOpen = (type: "edit" | "delete", invoice: Invoice) => {
    setDialogType(type);
    setSelectedInvoice(invoice);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDialogType(null);
    setSelectedInvoice(null);
  };

  const handleUpdateInvoice = () => {
    // Logic for updating the invoice
    handleDialogClose();
  };

  const handleDeleteInvoice = () => {
    // Logic for deleting the invoice
    handleDialogClose();
    handleMenuClose();
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

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    invoice: Invoice
  ) => {
    setSelectedInvoice(invoice);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  useEffect(() => {
    setSearchTerm(params.get("search") || "");
  }, [params])

  return (
    <PageContainer
      title="My Invoices"
      subChildren={
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <TextField
            placeholder="Search"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ width: { xs: "100%", sm: "200px" } }}
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
            sx={{ minWidth: { xs: "100%", sm: "120px" } }}
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={handleStatusFilter}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="unpaid">unpaid</MenuItem>
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
          <Table sx={{ minWidth: 650, border: "none" }}>
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
                          handleDialogOpen("edit", selectedInvoice!)
                        }
                      >
                        <EditIcon /> Edit
                      </MuiMenuItem>
                      <MuiMenuItem
                        onClick={() =>
                          handleDialogOpen("delete", selectedInvoice!)
                        }
                      >
                        <DeleteIcon /> Delete
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
        <DialogTitle>
          {dialogType === "edit" ? "Edit Invoice" : "Delete Invoice"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialogType === "edit" ? (
              "Edit the details of the invoice."
            ) : (
              <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                Are you sure you want to delete this invoice{" "}
                {selectedInvoice?.number}?
              </Typography>
            )}
          </DialogContentText>
          {/* Additional form fields for editing can be added here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          {dialogType === "edit" ? (
            <Button onClick={handleUpdateInvoice} color="primary">
              Update
            </Button>
          ) : (
            <Button onClick={handleDeleteInvoice} color="secondary">
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default InvoicesListPage;
