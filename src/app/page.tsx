import {  Container, Typography } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '40px', fontWeight: 'bold' }}>
        Welcome to Invoice Hub
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your one-stop solution for managing invoices efficiently.
      </Typography>
      <Link
        href="/invoices/list"
        style={{ color: "#1976d2", textDecoration: "underline", fontWeight: "bold" }}
      >
        View Invoices
      </Link>
    </Container>
  );
}
