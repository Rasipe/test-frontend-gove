"use client"
import { CircularProgress, Typography } from "@mui/material";

import styles from "./page.module.css";
import CityTable from "./components/CityTable";
import { createOrEdit as createOrEditCities, deleteById, getAll as getAllCities } from "./services/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import CityForm from "./components/CityForm";
import { useState } from "react";

export default function Home() {
  const [currentCity, setCurrentCity] = useState({})

  const { data: cities, refetch: refetchCities, isLoading: isLoadingCities } = useQuery({
    queryFn: async () => await getAllCities()
  });

  const saveCityMutation = useMutation({
    mutationFn: createOrEditCities,
    onSuccess: refetchCities,
  })

  const deleteCityMutation = useMutation({
    mutationFn: deleteById,
    onSuccess: refetchCities,
  })

  const handleEditCity = async (id) => {
    setCurrentCity(cities.find(city => city.id === id))
  }

  const handleDeleteCity = (id) => {
    deleteCityMutation.mutate(id)
  }

  return (
    <main className={styles.main}>
      <Typography variant="h2" component="h1" color="primary">
        Cadastro de Municipios
      </Typography>
      <CityForm currentCity={currentCity} id={currentCity.id} onResetData={() => setCurrentCity({})} onSaveData={saveCityMutation.mutate}></CityForm>
      {
        isLoadingCities ? <CircularProgress size={150} sx={{m: 5}}/>
        : <CityTable cities={cities || []} onEditData={handleEditCity} onDeleteData={handleDeleteCity}></CityTable>
      }
    </main>
  );
}
