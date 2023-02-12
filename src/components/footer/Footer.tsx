import {Grid, Tooltip} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useTheme from '@mui/system/useTheme';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useState} from "react";

interface FooterProps {
    patentId: string;
    collectionName: string;
}

function Footer({patentId, collectionName}: FooterProps) {
    const [copyTooltipText, setCopyTooltipText] = useState("copy");

    const theme = useTheme();

    const handleDownloadKey = () => {
        const key = localStorage.getItem('key');
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(key ?? ""));
        element.setAttribute('download', "key - " + patentId + " - " + collectionName );

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    const handleCopyKey = async () => {
        const key = localStorage.getItem('key');
        await navigator.clipboard.writeText(key ?? "");
        setCopyTooltipText("copied !");
    }

    return (
        <Grid container alignItems="center" className="footer-container"
              color="white" paddingX="3rem" paddingBottom="1rem"
              sx={{
                  background: theme.palette.secondary.main,
                  position: "fixed",
                  bottom: 0,
              }}>
            <Grid item container sx={{flexGrow: 1}} justifyContent="center" alignItems="center" spacing={3} >
                <Grid item>
                    <KeyIcon fontSize="large"/>
                </Grid>
                <Grid item>
                    <h3 style={{marginBlock: "0.5rem"}}>Get the encryption key for patent id
                        <span style={{textDecoration: 'underline'}}> {"{"} {patentId} {"}"} </span>
                        of collection
                        <span style={{textDecoration: 'underline'}}> {"{"} {collectionName} {"}"} </span>
                    </h3>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Tooltip title={"Download"} placement="top">
                        <IconButton
                            size="medium"
                            aria-label="download"
                            color="inherit"
                            onClick={handleDownloadKey}
                        >
                            <DownloadIcon fontSize="medium"/>
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip title={copyTooltipText} placement="top" onMouseLeave={() => setCopyTooltipText("copy")}>
                        <IconButton
                            size="medium"
                            aria-label="copy"
                            color="inherit"
                            onClick={handleCopyKey}
                        >
                            { copyTooltipText === "copy" && <ContentCopyIcon fontSize="medium"/>}
                            { copyTooltipText === "copied !" && <CheckCircleOutlineIcon fontSize="medium"/>}
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Footer;