import { PinataSDK } from "pinata-web3"

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.REACT_APP_JWT}`,
  pinataGateway: `${import.meta.env.REACT_APP_GATEWAY_URL}`
})