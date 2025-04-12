import { useState, useEffect } from "react";
import { ListItemPrefix, Checkbox, Typography } from "@material-tailwind/react";

export default function VersionTag({ name, status, onChange }) {
    const [tag, setTag] = useState(status);

    const change = (ev, name) => {
        ev.preventDefault();
        onChange(name);
    };

    useEffect(() => {
        setTag(status);
    }, [status]);

    return (
        <label
            htmlFor={`tag-${name}`}
            className="flex w-full cursor-pointer items-center p-0.5 rounded transition-all duration-200 hover:bg-primary-50/50 hover:shadow-sm"
        >
            <ListItemPrefix className="p-0 mr-1 flex items-center">
                <Checkbox
                    onChange={ev => change(ev, name)}
                    checked={tag}
                    id={`tag-${name}`}
                    className="hover:before:opacity-0 hover:bg-white focus:bg-white focus:ring-0 focus:ring-offset-0 [&>span]:border-0 [&>span]:shadow-none"
                    containerProps={{
                        className: "p-0",
                    }}
                    size="small"
                    ripple={false}
                    color="blue"
                />
            </ListItemPrefix>
            <Typography
                className="font-medium text-xs transition-colors duration-200 text-neutral-600"
            >
                {name.replace('_', ' ')}
            </Typography>
        </label>
    );
}
