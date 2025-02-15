'use client'
import { INVOICE_KEY } from '@/utils/invoice';
import { colors } from '@/utils/muiTheme';
import { Box, Button, TextField, Typography, Container, Grid, InputAdornment, Alert } from '@mui/material';
import React, { useState } from 'react';
import { InvoiceSchema } from '@/lib/schemas/invoices';
import { z } from 'zod';
import Link from 'next/link';
import Image from 'next/image';

interface InvoiceForm {
  name: string;
  number: number;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | '';
}

const InvoicesPage = () => {
  const [formData, setFormData] = useState<InvoiceForm>({
    name: '',
    number: 0,
    dueDate: '',
    amount: 0,
    status: ''
  });
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      // Transform and validate the data
      const validatedData = InvoiceSchema.parse({
        name: formData.name,
        number: Number(formData.number),
        dueDate: new Date(formData.dueDate),
        amount: Number(formData.amount),
        status: formData.status
      });

      // If validation passes, save to localStorage
      const existingInvoices = JSON.parse(localStorage.getItem(INVOICE_KEY) || '[]');
      localStorage.setItem(INVOICE_KEY, JSON.stringify([...existingInvoices, {...validatedData, number: `INV${validatedData.number}`}]));
      
      // Clear form
      setFormData({ name: '', number: 0, dueDate: '', amount: 0, status: '' });
      setError(null);
      setOpenAlertSuccess(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.log(err.errors);
        setError(`Validation failed: ${err.errors.map(e => e.message).join(', ')}`);
      }
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
        {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
                {error}
            </Alert>
        )}
        <Typography 
          variant="h4" 
          sx={{ 
            fontSize: { xs: '20px', sm: '26px' },
            fontWeight: 'bold',
            mb: 1.25
          }}
        >
          Add Invoice
        </Typography>
        <Container maxWidth={false} disableGutters>
          <Box sx={{ 
            bgcolor: 'white', 
            borderRadius: 1,
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
          }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Box
                p={2}
                sx={{
                  borderBottom: '1px solid #e5e7eb',
              }}>
                <Typography variant='h2' sx={{
                  fontSize: { xs: '14px', sm: '16px' },
                  fontWeight: '600'
                }}>Invoice Form</Typography>
              </Box>
              <Grid container spacing={2} padding={{ xs: 1, sm: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: '600' }}>
                      Name <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                    </Typography>
                    <TextField
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                      placeholder='Enter your invoice name'
                      sx={{ 
                        '& .MuiOutlinedInput-root': { height: '50px' }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: '600' }}>
                      Number <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                    </Typography>
                    <TextField
                      name="number"
                      value={formData.number}
                      onChange={(event) => handleChange(event as React.ChangeEvent<HTMLInputElement>)}
                      variant="outlined"
                      fullWidth
                      required
                      placeholder='Enter your invoice number'
                      sx={{ 
                        '& .MuiOutlinedInput-root': { height: '50px' }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: '600' }}>
                      Due Date <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                    </Typography>
                    <TextField
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleChange}
                      type="date"
                      variant="outlined"
                      fullWidth
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': { height: '50px' }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: '600' }}>
                      Amount <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                    </Typography>
                    <TextField
                      name="amount"
                      value={formData.amount}
                      onChange={(event) => {
                        const { value } = event.target;
                        setFormData({ ...formData, amount: Number(value) });
                      }}
                      variant="outlined"
                      placeholder='Enter your invoice amount'
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ backgroundColor: colors.white02, padding: '0 8px', color: colors.primary }}>
                            Rp.
                          </InputAdornment>
                        ),
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': { height: '50px' }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: '600' }}>
                      Status <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                    </Typography>
                    <TextField
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      select
                      variant="outlined"
                      placeholder='Choose the status'
                      fullWidth
                      required
                      SelectProps={{
                        native: true,
                      }}
                      sx={{ 
                        '& .MuiOutlinedInput-root': { height: '50px' }
                      }}
                    >
                      <option value="">Select status</option>
                      <option value="paid">Paid</option>
                      <option value="unpaid">Unpaid</option>
                      <option value="pending">Pending</option>
                    </TextField>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    mt: 2,
                    px: { xs: 1, sm: 0 } 
                  }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ 
                        height: { xs: '40px', sm: '50px' }, 
                        minWidth: { xs: '100%', sm: '150px' },
                        fontSize: '0.75rem'
                      }}
                    >
                      + Add Invoice
                    </Button>
                  </Box>
                </Grid>
              </Grid>
             
            </Box>
           
          </Box>
          {openAlertSuccess && (
                <Box 
                    sx={{ 
                        marginTop: '10px', 
                        background: colors['honeydew'], 
                        p: 2, 
                        borderRadius: 1, 
                        display: 'flex',
                        gap: 1,
                        boxShadow: 3,
                        width: '100%',
                        borderLeft: `6px solid ${colors['eucalyptus']}`,
                    }}
                >
                    <Image src="/added-check.svg" alt="added-check" width={37} height={32} />
                    <Box>
                        <Typography color='#1b5b4b' sx={{
                            fontSize: '16px',
                            fontWeight: '600'
                        }} variant='subtitle1' >Invoice added successfully!  </Typography>
                          <Typography color='#82949d' sx={{
                            fontSize: '16px',
                            fontWeight: '400'
                        }} variant='subtitle1' >
                            You can view and manage your invoice in the <Link href="/invoices/list" >My Invoices</Link> page.
                            </Typography>
                    </Box>
                </Box>
          )}      
        </Container>
    </Box>
  );
};

export default InvoicesPage;
