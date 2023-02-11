import {ExternalProvider} from "@ethersproject/providers";
import {ethers} from "ethers";
import {collectionsFactoryABI, collectionsFactoryAddress} from '../contracts/collectionsFactory';
import {collectionsNFTABI} from "../contracts/collectionNFT";

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}

export const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum): undefined;

export const signer = provider? provider.getSigner(): undefined;

export const collectionsFactory = new ethers.Contract(collectionsFactoryAddress, collectionsFactoryABI, signer);

export const getCollectionAddress = async(collectionName: string) => {
  return await collectionsFactory.getCollectionAddress(collectionName);
}

export const getCollectionNFT = async (collectionName: string) => {
  const address = await getCollectionAddress(collectionName);
  return new ethers.Contract(address, collectionsNFTABI, signer);
}