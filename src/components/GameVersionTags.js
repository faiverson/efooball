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
            return <FormControlLabel key={name} control={<Checkbox checked={active}  />} label={name.replace('_', ' ')} onClick={ev =>{
              ev.preventDefault()
              onChange(name)
            }} />
          })
        }
      </FormGroup>

    </>
  )
}
