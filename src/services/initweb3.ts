import { ExternalProvider } from "@ethersproject/providers";
import {ethers} from "ethers";
import {collectionsFactoryAddress, collectionsFactoryABI} from '../contracts/collectionsFactory';

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}

export const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum): undefined;

export const signer = provider? provider.getSigner(): undefined;

export const collectionsFactory = new ethers.Contract(collectionsFactoryAddress, collectionsFactoryABI, signer);