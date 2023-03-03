import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "react-query"
import axios from 'axios'
// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"
let MEDUSA_STOREFRONT_URL = "http://localhost:8000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

if (process.env.NEXT_PUBLIC_MEDUSA_STOREFRONT_URL) {
  MEDUSA_STOREFRONT_URL = process.env.NEXT_PUBLIC_MEDUSA_STOREFRONT_URL
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
      retry: 1,
    },
  },
})

const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
const customClient = axios.create({
  baseURL: MEDUSA_BACKEND_URL,
})
export { MEDUSA_BACKEND_URL, queryClient, medusaClient,customClient, MEDUSA_STOREFRONT_URL }
