import {useState, useEffect} from "react"
import { List, ListItem, ListItemPrefix, Checkbox, Typography } from "@material-tailwind/react";

function VersionTag({name, status, onChange}) {
  const [tag, setTag] = useState(status)
  const change = (ev, name) => {
    ev.preventDefault()
    onChange(name)
  }

  useEffect(() => {
    setTag(status)
  }, [status])

  return (
      <label
        htmlFor={`tag-${name}`}
        className="flex w-full cursor-pointer items-center p-0"
      >
        <ListItemPrefix className="p-0 mr-2">
          <Checkbox onChange={ev => change(ev, name)}
                    checked={tag}
                    id={`tag-${name}`}
                    className="hover:before:opacity-0  hover:bg-white focus:bg-white active:bg-yellow-dark-alternative"
                    containerProps={{
                      className: "py-0 px-1 ",
                    }}
                    color="yellow"
                    size="small"
                    ripple={false}
          />
        </ListItemPrefix>
        <Typography color="yellow" className="font-medium ">{name.replace('_', ' ')}</Typography>
      </label>
  )
}

export default function GameVersionTags({versions, onChange}) {
  return (
    <List>
        {
          versions.map( item => {
            const {name, active} = item;
            return (
              <ListItem key={name}  className="p-0 hover:bg-yellow-dark-alternative focus:bg-yellow-dark-alternative active:bg-yellow-dark-alternative">
                <VersionTag status={active} name={name} onChange={onChange} />
              </ListItem>
            )
          })
        }
    </List>
  )
}
