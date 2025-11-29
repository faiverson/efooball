import { List, ListItem } from "@material-tailwind/react";
import VersionTag from "./VersionTag";

export default function GameVersionTags({versions, onChange}) {
  return (
    <List className="p-0">
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
