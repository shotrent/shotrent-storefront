import { DurationType } from "@lib/models/listing";

const useDurationTypes = () => [
    {
      name: 'Months',
      variants: ['1', '3', '6', '12'],
      type: DurationType.MONTHLY,
      pricingOptions: [
        {
          interestRates: [.14, .14, .14, .14],
          commission: [.2, .2, .2, .2],
          depreciation: .2,
          tax:.18,
          buyOutPeriod: [9, 16, 21, 26,]
        },
        {
          interestRates: [.18, .18, .18, .18],
          commission: [.2, .2, .2, .2],
          depreciation: .2,
          tax:.18,
          buyOutPeriod: [9, 16, 21, 26,]
        },
        {
          interestRates: [.24, .24, .24, .24],
          commission: [.2, .2, .2, .2],
          depreciation: .2,
          tax:.18,
          buyOutPeriod: [9, 16, 21, 26,]
        }
      ]
    },
    {
      name: 'Daily',
      variants: ['1', '3', '6', '12'],
      type: DurationType.DAILY,
      pricingOptions:[]
    }
  ];

  export default useDurationTypes;