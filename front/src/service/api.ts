import axios from "axios";
import type { Imovel } from "../entity/imovel";
import type { Comodo } from "../entity/comodo";

const api = axios.create({
  baseURL: "http://localhost:8085",
});

export async function getImoveis() {
  const response = await api.get("/imovel");
  return response.data;
}

export async function getImovelById(idImovel: number) {
  const response = await api.get<Imovel>(`/imovel/${idImovel}`, {
    params: { idImovel },
  });
  return response.data;
}

export async function saveImovel(imovel: Imovel) {
  const response = await api.post<Imovel>("/imovel", imovel);
  return response.data;
}

export async function updateImovel(imovel: Imovel) {
  const response = await api.put<Imovel>("/imovel", imovel);
  return response.data;
}

export async function addComodo(nomeComodo: String, idImovel: number) {
  console.log(idImovel);
  const response = await api.put<Imovel>(`/imovel/addComodo`, {
    idImovel: idImovel,
    nomeComodo: nomeComodo,
  });
  return response.data;
}

export async function deleteComodoImovel(idComodo: number, idImovel: number) {
  console.log(idImovel);
  const response = await api.put<Imovel>(`/imovel/deleteComodo`, {
    idImovel: idImovel,
    idComodo: idComodo,
  });
  return response.data;
}

export async function deleteImovel(idImovel: number) {
  const response = await api.delete(`/imovel/${idImovel}`, {
    params: { idImovel },
  });
  return response.data;
}

export async function getComodos() {
  const response = await api.get<Comodo[]>("/comodo");
  return response.data;
}

export async function getComodoById(idComodo: number) {
  const response = await api.get<Comodo>(`/comodo/${idComodo}`, {
    params: { idComodo },
  });
  return response.data;
}

export async function saveComodo(comodo: Comodo) {
  const response = await api.post<Comodo>("/comodo", comodo);
  return response.data;
}

export async function updateComodo(comodo: Comodo) {
  const response = await api.put<Comodo>("/comodo", comodo);
  return response.data;
}

export async function deleteComodo(idComodo: number) {
  const response = await api.delete(`/comodo/${idComodo}`, {
    params: { idComodo },
  });
  return response.data;
}

export default api;
