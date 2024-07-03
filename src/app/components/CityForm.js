"use client"
import {
  FormControl, InputLabel, TextField, OutlinedInput, InputAdornment, Box, Grid, Button
} from "@mui/material";
import { useEffect, useState } from "react";

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function CityForm({ currentCity, onSaveData, onResetData }) {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState(null)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState(null)
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState(null)
  const [monthlyValue, setMonthlyValue] = useState("")
  const [monthlyValueError, setMonthlyValueError] = useState(null)
  const [description, setDescription] = useState("")
  const [hasError, setError] = useState(true)

  const inputVariant = "outlined"

  const styles = {
    form: {
      width: "100%",
      background: "white",
      m: 5,
      p: 5,
      borderRadius: 1,
      boxSizing: "border-box",
      boxShadow: "0px 2px 2px gray"
    }
  }

  const handleChange = (event, propSetter, errorSetter) => {
    errorSetter && errorSetter(!event.target.validity.valid)
    propSetter(event.target.value)
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setPhone("")
    setMonthlyValue("")
    setDescription("")

    setNameError(null)
    setEmailError(null)
    setPhoneError(null)
    setMonthlyValueError(null)

    onResetData()
  }

  const submitForm = async (event) => {
    event.preventDefault();
    const data = {
      ...currentCity,
      name,
      email,
      phoneNumber: phone,
      monthlyValue,
      description
    }

    onSaveData(data)
    resetForm();
  }

  useEffect(() => {
    const dataIsEmpty = Object.keys(currentCity).length === 0 && currentCity.constructor === Object
    if (dataIsEmpty) {
      return;
    }
    setName(currentCity.name)
    setEmail(currentCity.email)
    setPhone(currentCity.phoneNumber)
    setMonthlyValue(currentCity.monthlyValue)
    setDescription(currentCity.description)

    setNameError(!currentCity.name)
    setEmailError(!currentCity.email)
    setPhoneError(!currentCity.phoneNumber)
    setMonthlyValueError(!currentCity.monthlyValue)
  }, [currentCity])

  useEffect(() => {
    const hasErrorOrNull = nameError || emailError || phoneError || monthlyValueError
    setError(hasErrorOrNull || hasErrorOrNull === null)
  }, [nameError, emailError, phoneError, monthlyValueError])

  return (
    <Box
      component="form"
      sx={styles.form}
      noValidate
      autoComplete="off"
      onSubmit={submitForm}
      onReset={resetForm}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="input-name"
            label="Nome"
            error={nameError}
            value={name}
            required
            fullWidth
            variant={inputVariant}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => handleChange(event, setName, setNameError)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="input-email"
            label="Email"
            error={emailError}
            value={email}
            type="email"
            required
            fullWidth
            variant={inputVariant}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => handleChange(event, setEmail, setEmailError)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="input-phone"
            label="Telefone"
            error={phoneError}
            value={phone}
            type="tel"
            required
            fullWidth
            variant={inputVariant}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon />
                </InputAdornment>
              ),
            }}
            onChange={(event) => handleChange(event, setPhone, setPhoneError)}
          />
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel htmlFor="monthly-value">Valor mensal</InputLabel>
            <OutlinedInput
              type="number"
              id="monthly-value"
              label="Valor mensal"
              value={monthlyValue}
              error={monthlyValueError}
              required
              startAdornment={<InputAdornment position="start">R$</InputAdornment>}
              onChange={(event) => handleChange(event, setMonthlyValue, setMonthlyValueError)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="input-name"
            label="Descrição"
            value={description}
            fullWidth
            multiline
            rows={5}
            variant={inputVariant}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => handleChange(event, setDescription, null)}
          />
        </Grid>
        <Grid item container direction="row" justifyContent="flex-end" alignItems="center" gap={2}>
          <Button variant="outlined" size="large" type="reset">Cancelar</Button>
          <Button variant="contained" size="large" type="submit" disabled={hasError}>Salvar</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
