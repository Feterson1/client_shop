export interface IOrderAccordionProps {
  setOrderIsReady: (arg0: boolean) => void
  showDoneSvg: boolean
}

export interface IMakePayFx {
  url: string
  amount: number
  description: string
}

export interface ICheckPayFx {
  url: string
  paymentId: string
}
