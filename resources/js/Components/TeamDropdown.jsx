import { Select, Option } from '@material-tailwind/react'
import React from "react";


export default function TeamDropdown({ teams, selected, onChange }) {

  return (
    <Select size="md" label="Select Team" color="violet"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            value={selected}
            onChange={onChange}>
      {
        teams.map(team => <Option key={team.id} value={team.id}>{team.name}</Option>)
      }
    </Select>
  );
}
