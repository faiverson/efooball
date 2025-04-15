import React from 'react';
import { Chip } from "@material-tailwind/react";
import { TagIcon } from "@heroicons/react/24/outline";
import { parseTag } from '@/lib/utils';
import { useColor } from '@/Hooks/useColor';

export default function TagSummary({
    versions,
    color,
    label,
    icon = true
}) {
    const { getColor } = useColor();

    return (
        <div className="w-full flex items-center gap-2 text-neutral-600 text-sm">
            {icon && <TagIcon className={`h-4 w-4 mt-0.5 ${getColor(color, ['icon'])}`} />}
            <span>{label}</span>
            <div className="flex flex-wrap gap-2">
                {versions.filter(v => v.active).map((v, index) => (
                    <Chip
                        key={index}
                        value={parseTag(v.name)}
                        className={`${getColor(color, ['bg', 'text'])}`}
                    />
                ))}
            </div>
        </div>
    );
}
