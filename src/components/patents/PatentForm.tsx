import {Box, Button, Grid, TextField} from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";
import {getCollectionNFT} from "../../services/initweb3";
import * as crypto from "crypto-js";
import {ipfs} from "../../services/uploadIPFS";
import {Error, Success} from "../../services/responses";
import LoadingButton from "@mui/lab/LoadingButton";

interface PatentFormProps {
    collectionName: string;
    patentAddedCallback?: (collectionName: string, patentId: string) => any;
}

function PatentForm({collectionName, patentAddedCallback}: PatentFormProps) {
    const [collectionNFT, setCollectionNFT] = useState<any>(null);

    const [subject, setSubject] = useState("");
    const [subjectValid, setSubjectValid] = useState(true);
    const [subjectPristine, setSubjectPristine] = useState(true);

    const [patentId, setPatentId] = useState("");
    const [patentIdValid, setPatentIdValid] = useState(true);
    const [patentIdPristine, setPatentIdPristine] = useState(true);

    const [researcher, setResearcher] = useState("");
    const [researcherValid, setResearcherValid] = useState(true);
    const [researcherPristine, setResearcherPristine] = useState(true);

    const [university, setUniversity] = useState("");
    const [universityValid, setUniversityValid] = useState(true);
    const [universityPristine, setUniversityPristine] = useState(true);

    const [institution, setInstitution] = useState("");
    const [institutionValid, setInstitutionValid] = useState(true);
    const [institutionPristine, setInstitutionPristine] = useState(true);

    const [successOpen, setSuccessOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        setCollectionElements();
    }, [collectionName]);

    const setCollectionElements = async () => {
        const collectionNFT = await getCollectionNFT(collectionName);
        setCollectionNFT(collectionNFT);
    }

    const validatePatentId = (value: string) => {
        setPatentIdPristine(false);
        const reg = new RegExp(/^[A-F]-[1-9]{5,7}\/[A-Z]{5,9}$/);
        setPatentIdValid(reg.test(value));
        setPatentId(value);
    }

    const validateSubject = (value: string) => {
        setSubjectPristine(false);
        setSubjectValid(value.trim() !== "");
        setSubject(value);
    }

    const validateResearcher = (value: string) => {
        setResearcherPristine(false);
        setResearcherValid(value.trim() !== "");
        setResearcher(value);
    }

    const validateUniversity = (value: string) => {
        setUniversityPristine(false);
        setUniversityValid(value.trim() !== "");
        setUniversity(value);
    }

    const validateInstitution = (value: string) => {
        setInstitutionPristine(false);
        setInstitutionValid(value.trim() !== "");
        setInstitution(value);
    }

    const mintNFT = async () => {
        const tx = await collectionNFT.mintPatent();
        let receipt = await tx.wait();
        return (receipt.events[0].args['tokenId']).toNumber();
    };

    const createEncryptionKey = () => {
        const encryptionKey = crypto.lib.WordArray.random(16).toString(); // 128-bits === 16-bytes
        localStorage.setItem('key', encryptionKey);
    }

    const encryptData = (data: any) => {
        return crypto.AES.encrypt(JSON.stringify(data), localStorage.getItem('key')!).toString();
    }

    const uploadToIpfs = async (data: string) => {
        return await ipfs.add(data)
    }

    const addTokenUriToNFT = async (tokenId: string, tokenURI: string) => {
        const tokenUriTx = await collectionNFT.setTokenURI(tokenId, tokenURI);
        await tokenUriTx.wait();
        console.info(`Token URI added to NFT ${tokenId}`);
    }

    const fetchTokenUri = async (tokenId: string) => {
        return await collectionNFT.getTokenURI(tokenId);
    }

    const submitPatent = async () => {
        setLoading(true);
        try {
            const tokenId = await mintNFT();
            console.info('NFT created with tokenId: ' + tokenId);
            createEncryptionKey();
            console.info('Symmetric encryption key created');
            // encrypt form data
            const contractData = {
                researcher: researcher.trim(),
                university: university.trim(),
                patent_filed: {
                    patent_id: patentId.trim(),
                    institution: institution.trim(),
                }
            }
            const ciphertext = encryptData(contractData);
            const contractDataResult = await uploadToIpfs(ciphertext);
            console.info('Contract Data encrypted and uploaded to IPFS');
            // prepare NFT metadata
            const nftMetadata = {
                name: `token ${tokenId}`,
                subject: `this token can cure ${subject.trim()}`,
                contractData: `https://skywalker.infura-ipfs.io/ipfs/${contractDataResult.path}`
            }
            const metadataResult = await uploadToIpfs(JSON.stringify(nftMetadata));
            console.info('NFT metadata uploaded to IPFS');
            const tokenURI = `https://skywalker.infura-ipfs.io/ipfs/${metadataResult.path}`;

            await addTokenUriToNFT(tokenId, tokenURI);
            const result = await fetchTokenUri(tokenId);
            console.info(`token URI ${result} added to NFT with id ${tokenId}`);
            const openSeaUrl = `https://testnets.opensea.io/assets/goerli/${collectionNFT.address}/${tokenId}`;
            setSuccessMessage(`check your NFT at ${openSeaUrl} and token URI at ${tokenURI}`);
            if (patentAddedCallback) patentAddedCallback(collectionName.trim(), patentId.trim());
            setSuccessOpen(true);
            resetForm();
        }
        catch (e: any) {
            setErrorMessage(e.reason);
            setErrorOpen(true);
        }
        finally {
            setLoading(false);
        }
    }

    const handleSuccessClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessOpen(false);
    };

    const handleErrorClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorOpen(false);
    };

    const decryptDocument = async (encryptedText: string) => {
        const bytes = crypto.AES.decrypt(encryptedText, localStorage.getItem('key')!);
        const decryptedData = JSON.parse(bytes.toString(crypto.enc.Utf8));
        console.log(decryptedData);
    }

    const resetForm = () => {
        setSubject("");
        setSubjectValid(true);
        setSubjectPristine(true);
        setResearcher("");
        setResearcherValid(true);
        setResearcherPristine(true);
        setUniversity("");
        setUniversityValid(true);
        setUniversityPristine(true);
        setPatentId("");
        setPatentIdValid(true);
        setPatentIdPristine(true);
        setInstitution("");
        setInstitutionValid(true);
        setInstitutionPristine(true);
    }

    return (
        <Box marginX={'30px'}>
            <Success open={successOpen} handleClose={handleSuccessClose} message={successMessage}></Success>
            <Error open={errorOpen} handleClose={handleErrorClose} message={errorMessage}></Error>
            <Grid container>
                <h2>Add patent to <span style={{textDecoration: 'underline'}}>{collectionName}</span> Collection</h2>
            </Grid>
            <Grid container>
                <TextField label="Subject" value={subject}
                           placeholder='E.g. hayfever'
                           onChange={(e) => validateSubject(e.target.value)}
                           error={!subjectValid}
                           helperText={subjectValid ? '' : 'Field required'}
                           variant='standard' fullWidth/>
            </Grid>
            <Grid container>
                <TextField label="Lead Researcher" value={researcher}
                           onChange={(e) => validateResearcher(e.target.value)}
                           error={!researcherValid}
                           helperText={researcherValid ? '' : 'Field required'}
                           variant='standard' fullWidth/>
            </Grid>
            <Grid container>
                <TextField label="University" variant='standard' value={university}
                           placeholder="Researcher's university"
                           onChange={(e) => validateUniversity(e.target.value)}
                           error={!universityValid}
                           helperText={universityValid ? '' : 'Field required'}
                           fullWidth/>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <TextField label="Patent Id" variant='standard'
                               value={patentId}
                               error={!patentIdValid}
                               helperText={patentIdValid ? '' : 'Must be in the format [A-F]-[1-9]{5,7}/[A-Z]{5,9}'}
                               onChange={(e) => validatePatentId(e.target.value.trim())}
                               fullWidth/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Filling Institution" value={institution}
                               onChange={(e) => validateInstitution(e.target.value)}
                               error={!institutionValid}
                               helperText={institutionValid ? '' : 'Field Required'}
                               variant='standard' fullWidth/>
                </Grid>
            </Grid>
            <Grid container direction="row-reverse" marginTop={'20px'}>
                <Grid item>
                    <LoadingButton
                        disabled={!(patentIdValid && researcherValid && institutionValid && universityValid && subjectValid)
                            || patentIdPristine || researcherPristine || institutionPristine || universityPristine || subjectPristine}
                        onClick={submitPatent}
                        loading={loading}
                        variant='contained'>
                        Submit patent
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PatentForm;