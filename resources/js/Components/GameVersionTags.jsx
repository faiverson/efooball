import { useState, useEffect } from "react"
import { Checkbox } from "@material-tailwind/react";

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
    <div className="flex items-center">
      <Checkbox color="amber" onChange={ev => change(ev, name)} checked={tag} id={`tag-${name}`} label={name.replace('_', ' ')} />
    </div>
  )
}

export default function GameVersionTags({versions, onChange}) {
  return (
    <div>
        {
          versions.map( item => {
            const {name, active} = item;
            return <VersionTag key={name} status={active} name={name} onChange={onChange} />
          })
        }
    </div>
  )
}
