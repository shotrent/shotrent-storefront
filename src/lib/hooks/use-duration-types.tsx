import { DurationType } from "@lib/models/listing";

const useDurationTypes = () => [
    {
      name: 'Months',
      variants: ['1', '3', '6', '12'],
      type: DurationType.MONTHLY,
      pricingOptions: [
        {
          interestRates: [.24, .20, .18, .16],
          commission: [.24, .20, .18, .15],
          depreciation: .2,
          tax:.18,
          buyOutPeriod: [9, 16, 21, 26,]
        },
        {
          interestRates: [.27, .20, .19, .18],
          commission: [.24, .20, .18, .15],
          depreciation: .2,
          tax:.18,
          buyOutPeriod: [9, 16, 21, 26,]
        },
        {
          interestRates: [.3, .24, .22, .2],
          commission: [.24, .20, .18, .15],
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