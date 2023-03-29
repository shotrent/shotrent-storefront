import { medusaClient } from "@lib/config"
import { Customer } from "@medusajs/medusa"
import { useMeCustomer } from "medusa-react"
import { useRouter } from "next/router"
import React, { createContext, useCallback, useContext, useState } from "react"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

interface AccountContext {
  customer?: Omit<Customer, "password_hash">
  retrievingCustomer: boolean
  loginView: [LOGIN_VIEW, React.Dispatch<React.SetStateAction<LOGIN_VIEW>>]
  checkSession: () => void
  refetchCustomer: () => void,
  logout: () => void
}

const AccountContext = createContext<AccountContext | null>(null)

interface AccountProviderProps {
  children?: React.ReactNode
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const {
    customer,
    isLoading: retrievingCustomer,
    refetch,
    remove
  } = useMeCustomer({ onError: () => {} })
  const loginView = useState<LOGIN_VIEW>(LOGIN_VIEW.REGISTER)

  const router = useRouter();

  const checkSession = useCallback(() => {
    
    const redirect_url = router.asPath;
    const params = new URLSearchParams({ redirect_url});
    if (!customer && !retrievingCustomer) {
      router.push(`/account/login?${params.toString()}`)
    }
  }, [customer, retrievingCustomer, router])

  const logout = () => {
    medusaClient.auth.deleteSession().then(()=>{
      remove();
      router.push('/');
    })    
  }

  return (
    <AccountContext.Provider
      value={{
        customer,
        retrievingCustomer,
        loginView,
        checkSession,
        refetchCustomer: refetch,
        logout
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => {
  const context = useContext(AccountContext)

  if (context === null) {
    throw new Error("useAccount must be used within a AccountProvider")
  }
  return context
}
