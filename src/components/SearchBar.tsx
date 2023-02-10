import {Box, Button, Grid, TextField} from "@mui/material";
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
          <Grid sx={{ flexGrow: 1 }} style={{paddingRight: '40px'}}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField label="" placeholder="Search ..." sx={{ flexGrow: 1 }}
                             onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                 onInputChange(event.target.value);
                             }}
                             variant="standard" color="secondary"/>
              </Box>
          </Grid>
          <Grid>
              <Button color="success" onClick={onAddCollection} variant='contained'>
                  <AddIcon />
              </Button>
          </Grid>
      </Grid>
    );
}

export default SearchBar;