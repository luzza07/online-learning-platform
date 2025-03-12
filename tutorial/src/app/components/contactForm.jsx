"use client";
import { useState } from "react";
import { Box, TextField, Button, Grid, Paper } from "@mui/material";

const ContactForm = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setResponse(data.message);
    setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </Grid>
      </Grid>
      <TextField fullWidth type="email" label="Email" name="email" value={formData.email} onChange={handleChange} required sx={{ mt: 2 }} />
      <TextField fullWidth type="tel" label="Phone (optional)" name="phone" value={formData.phone} onChange={handleChange} sx={{ mt: 2 }} />
      <TextField fullWidth multiline rows={4} label="Message" name="message" value={formData.message} onChange={handleChange} required sx={{ mt: 2 }} />
      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2, backgroundColor: "#FF5722", '&:hover': { backgroundColor: "#E64A19" } }}>
        Submit
      </Button>
    </Box>
  );
};

export default ContactForm;
