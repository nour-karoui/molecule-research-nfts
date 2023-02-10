import { ExternalProvider } from "@ethersproject/providers";
import {ethers} from "ethers";

declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}

export const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum): undefined;

export const signer = provider? provider.getSigner(): undefined;

// export const projectsFactory = new ethers.Contract(projectsFactoryAddress, projectsFactoryABI, signer);

// export const RVLToken = new ethers.Contract(rvlTokenAddress, rvlTokenABI, signer);