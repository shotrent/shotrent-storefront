import { canBuy } from "@lib/util/can-buy"
import { findCheapestPrice } from "@lib/util/prices"
import { isValid } from "date-fns"
import differenceInDays from "date-fns/differenceInDays"
import format from "date-fns/format"
import isEqual from "lodash/isEqual"
import { formatVariantPrice, useCart } from "medusa-react"
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Product, Variant } from "types/medusa"
import { useStore } from "./store-context"

interface ProductContext {
  formattedPrice: string
  quantity: number
  disabled: boolean
  inStock: boolean
  variant?: Variant
  maxQuantityMet: boolean
  selectionRange:{
    startDate: Date | undefined,
    endDate: Date | undefined,
    key: string,
  }
  options: Record<string, string>
  selectedDates:string
  isDateRangeValid:boolean
  updateOptions: (options: Record<string, string>) => void
  increaseQuantity: () => void
  decreaseQuantity: () => void
  addToCart: () => void
  updateDateRange: (value:{
    startDate: Date,
    endDate: Date,
    key: string,
  })=> void
}

const ProductActionContext = createContext<ProductContext | null>(null)

interface ProductProviderProps {
  children?: React.ReactNode
  product: Product
}

export const ProductProvider = ({
  product,
  children,
}: ProductProviderProps) => {
  const [quantity, setQuantity] = useState<number>(1)
  const [options, setOptions] = useState<Record<string, string>>({})
  const [maxQuantityMet, setMaxQuantityMet] = useState<boolean>(false)
  const [inStock, setInStock] = useState<boolean>(true)
  const defaultSelectionRange: {
    startDate: Date | undefined,
    endDate: Date | undefined,
    key: string,
  } = {
    startDate : undefined,
    endDate : new Date(""),
    key: 'selection',
  }
  const [selectionRange, setSelectionRange] = useState(defaultSelectionRange);
  const { addItem } = useStore()
  const { cart } = useCart()
  const { variants } = product

  const updateDateRange =  (data: React.SetStateAction<{ startDate: Date | undefined; endDate: Date | undefined; key: string }>) => setSelectionRange(data);
  const isDateRangeValid = useMemo(()=> isValid(selectionRange.startDate) && isValid(selectionRange.endDate), [selectionRange]);
  const selectedDates = useMemo(()=>{
    if(!isDateRangeValid) return '';
    const startDate:Date = selectionRange.startDate as any;
    const endDate:Date = selectionRange.endDate as any;
    return `${format(startDate, 'MMM dd, yyyy')} - ${format(endDate, 'MMM dd, yyyy')}`;
  },[selectionRange])
  useEffect(() => {
    // initialize the option state
    const optionObj: Record<string, string> = {}
    for (const option of product.options) {
      Object.assign(optionObj, { [option.id]: undefined })
    }
    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      const tmp: Record<string, string> = {}

      for (const option of variant.options) {
        tmp[option.option_id] = option.value
      }

      map[variant.id] = tmp
    }

    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  const disabled = useMemo(() => {
    return !variant
  }, [variant])

  // memoized function to get the price of the current variant
  const formattedPrice = useMemo(() => {
    if (variant && cart?.region) {
      return formatVariantPrice({ variant, region: cart.region })
    } else if (cart?.region) {
      return findCheapestPrice(variants, cart.region)
    } else {
      // if no variant is selected, or we couldn't find a price for the region/currency
      return "N/A"
    }
  }, [variant, variants, cart])

  useEffect(() => {
    if (variant) {
      setInStock(canBuy(variant))
    }
  }, [variant])

  const updateOptions = (update: Record<string, string>) => {
    setOptions({ ...options, ...update })
  }

  const calculateVariantAndQty = () => {
    const dateRange:{startDate:Date, endDate:Date} = selectionRange as any;
    const numberOfDays = differenceInDays(dateRange.endDate, dateRange.startDate) + 1;
    const variant = product.variants.find(variant=>{
      const variantValue = parseInt(variant.options[0].value);
      return numberOfDays <= variantValue;
    });
    const quantity = numberOfDays;
    return {
      quantity,
      variant
    }
  }

  const addToCart = () => {
    const { variant, quantity } = calculateVariantAndQty();
    if (variant) {
      addItem({
        variantId: variant.id,
        quantity,
        metadata: {
          startDate: selectionRange.startDate,
          endDate: selectionRange.endDate
        }
      })
    }
  }

  const increaseQuantity = () => {
    const maxQuantity = variant?.inventory_quantity || 0

    if (maxQuantity > quantity + 1) {
      setQuantity(quantity + 1)
    } else {
      setMaxQuantityMet(true)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)

      if (maxQuantityMet) {
        setMaxQuantityMet(false)
      }
    }
  }

  return (
    <ProductActionContext.Provider
      value={{
        quantity,
        maxQuantityMet,
        disabled,
        inStock,
        options,
        variant,
        addToCart,
        updateOptions,
        decreaseQuantity,
        increaseQuantity,
        formattedPrice,
        selectionRange,
        updateDateRange,
        selectedDates,
        isDateRangeValid
      }}
    >
      {children}
    </ProductActionContext.Provider>
  )
}

export const useProductActions = () => {
  const context = useContext(ProductActionContext)
  if (context === null) {
    throw new Error(
      "useProductActionContext must be used within a ProductActionProvider"
    )
  }
  return context
}
