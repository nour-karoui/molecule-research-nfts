import {Box, Button, Grid, TextField} from "@mui/material";
import {useState} from "react";

interface PatentFormProps {
    collection: string;
}

function PatentForm({collection}: PatentFormProps) {
    const [patentIdPristine, setPatentIdPristine] = useState(true);
    const [researcherPristine, setResearcherPristine] = useState(true);
    const [universityPristine, setUniversityPristine] = useState(true);
    const [institutionPristine, setInstitutionPristine] = useState(true);

    const [patentId, setPatentId] = useState("");
    const [patentIdValid, setPatentIdValid] = useState(true);

    const [researcher, setResearcher] = useState("");
    const [researcherValid, setResearcherValid] = useState(true);

    const [university, setUniversity] = useState("");
    const [universityValid, setUniversityValid] = useState(true);

    const [institution, setInstitution] = useState("");
    const [institutionValid, setInstitutionValid] = useState(true);

    const validatePatentId = (value: string) => {
        setPatentIdPristine(false);
        const reg = new RegExp(/^[A-F]-[1-9]{5,7}\/[A-Z]{5,9}$/);
        setPatentIdValid(reg.test(value));
        setPatentId(value);
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
    const submitPatent = () => {
        console.log(university.trim());
        console.log(institution.trim());
        console.log(researcher.trim());
        console.log(patentId.trim());
    }


    return (
        <Box marginX={'30px'}>
            <Grid container>
                <h2>Add patent to {collection} Collection</h2>
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
                               helperText={patentIdValid ? '' : 'Must be in the format [A-F]-[1-9]{5,7}\/[A-Z]{5,9}'}
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
                    <Button disabled={!(patentIdValid && researcherValid && institutionValid && universityValid)
                        || patentIdPristine || researcherPristine || institutionPristine || universityPristine}
                            onClick={submitPatent}
                            variant='contained'>
                        Submit patent
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default PatentForm;