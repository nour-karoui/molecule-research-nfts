import {Box, Grid, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import {ChangeEvent} from "react";

interface SearchBarProps {
    inputUpdated: (input: string) => any;
    addCollection: () => void;
}

function SearchBar({inputUpdated, addCollection}: SearchBarProps) {

    const onInputChange = (value: string) => {
        inputUpdated(value);
    }

    const onAddCollection = () => {
        addCollection();
    }

    return (
      <Grid container>
          <Grid>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField label="" placeholder="search ..." sx={{ flexGrow: 1 }}
                             onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                 onInputChange(event.target.value);
                             }}
                             variant="standard" color="secondary"/>
              </Box>
          </Grid>
          <Grid>
              <IconButton color="success" onClick={onAddCollection}>
                  <AddIcon />
              </IconButton>
          </Grid>
      </Grid>
    );
}

export default SearchBar;