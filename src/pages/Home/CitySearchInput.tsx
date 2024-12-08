import { useState, useRef } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { City } from '../../Types/city';
import { getCities } from '../../api/Cities';

interface CitySearchInputProps {
  selectedCity: City | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
}

function CitySearchInput({
  selectedCity,
  setSelectedCity,
}: CitySearchInputProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleInputChange = async (value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (value) {
      debounceRef.current = setTimeout(async () => {
        setIsLoading(true);
        const cities = await getCities(value);
        setCities(cities);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleChange = (newValue: City | null) => {
    setSelectedCity(newValue);
  };

  return (
    <Autocomplete
      options={cities}
      value={selectedCity}
      noOptionsText="No Cities"
      loading={isLoading}
      loadingText="Searching..."
      getOptionLabel={(option) =>
        `${option.name}, ${option.region}, ${option.country}`
      }
      getOptionKey={(option) => option.id}
      onChange={(_, value) => handleChange(value)}
      onInputChange={(_, value) => handleInputChange(value)}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for a city..."
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.paper',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'background.paper',
              },
              '& fieldset': {
                borderColor: 'primary.light',
              },
            },
          }}
        />
      )}
    />
  );
}

export default CitySearchInput;
