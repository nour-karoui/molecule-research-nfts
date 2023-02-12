import {Box, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {ChangeEvent} from "react";

interface SearchBarProps {
    inputUpdated: (input: string) => any;
}

function SearchBar({inputUpdated}: SearchBarProps) {

    const onInputChange = (value: string) => {
        inputUpdated(value);
    }

    return (
        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
            <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
            <TextField label="" placeholder="Search ..." sx={{flexGrow: 1}}
                       onChange={(event: ChangeEvent<HTMLInputElement>) => {
                           onInputChange(event.target.value);
                       }}
                       variant="standard" color="secondary"/>
        </Box>
    );
}

export default SearchBar;