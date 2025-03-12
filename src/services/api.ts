// Aqui vamos conectar com o backend em nestjs
import axios from "axios";
import { type Products } from "@/types/Products";

const API_URL = "http://localhost:3000/products";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// Retornar todos os produtos
export const getAllProducts = async (): Promise<Products[]> => {
    const response = await api.get("/");
    return response.data;
}

// Retornar um produto pelo id
export const getProductByid = async (id: number):Promise<Products | null> => {
    const response = await api.get(`/${id}`);
    return response.data;
}

// Criar um novo Produto
export const createProducts = async (products: Omit<Products, "id">): Promise<Products> => {
    const response = await api.post("/", products)
    return response.data;
}

// Atualizar produto
export const updateProducts =  async (id: number, products: Partial<Products>): Promise<Products> => {
    const response = await api.put(`/${id}`, products)
    return response.data;
}

// Deletar Produto
export const deleteProducts =  async (id: number): Promise<void> => {
    const response = await api.delete(`${API_URL}/${id}`)
    return response.data;
}

export default api;