import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "react-query"
import axios from 'axios'
// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"
let MEDUSA_STOREFRONT_URL = "http://localhost:8000"
let STRIPE_PUBLISHABLE_KEY = "pk_test_51MfHnVSFJnfsfQzupt9IWM7Yn4nZXVtZWBqw6toG8X55hFx5lITfWSnn6A67caSqInWK3UxNV1nDVqff1ZY8vVZ600U9khkDYI";

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
}

if (process.env.NEXT_PUBLIC_MEDUSA_STOREFRONT_URL) {
  MEDUSA_STOREFRONT_URL = process.env.NEXT_PUBLIC_MEDUSA_STOREFRONT_URL
}

if(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
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

const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });
const customClient = axios.create({
  baseURL: MEDUSA_BACKEND_URL,
})
export { MEDUSA_BACKEND_URL, queryClient, medusaClient,customClient, MEDUSA_STOREFRONT_URL, STRIPE_PUBLISHABLE_KEY }
