import { create as ipfsHttpClient } from "ipfs-http-client";

const projectId = process.env.REACT_APP_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_SECRET_KEY;
const ipfsEndpoint = process.env.REACT_APP_IPFS_ENDPOINT;
const authorization = "Basic " + window.btoa(projectId + ":" + projectSecretKey);

export const ipfs = ipfsHttpClient({
    url: ipfsEndpoint,
    headers: {
        authorization,
    },
});