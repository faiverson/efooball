import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function GameVersionTags({versions, onChange}) {
  return (
    <>
      <FormGroup>
        {
          versions.map( item => {
            const {name, active} = item;
            return <FormControlLabel key={name} control={<Checkbox color="secondary" sx={{
              '&.MuiCheckbox-colorSecondary .MuiSvgIcon-root': {
                color: '#B3A200',
              },
            }}  checked={active} />} label={name.replace('_', ' ')} onClick={ev =>{
              ev.preventDefault()
              onChange(name)
            }} />
          })
        }
      </FormGroup>

    </>
  )
}
