import React from 'react';
import { Chip } from '@material-tailwind/react';
import { UserIcon } from '@heroicons/react/24/outline';

export const PlayerChipType = {
    head: 'head',
    tail: 'tail',
};

export default function PlayerChip({type, player, selected, onChange}) {
  const onClick = ev => {
    ev.preventDefault()
    onChange(type, player)
  }

  const getChipColor = () => {
    if (selected) {
      return type === PlayerChipType.head ? "teal" : "purple";
    }
    return "gray";
  }

  const getChipVariant = () => {
    return selected ? "filled" : "outlined";
  }

  const attributes = {
    onClick: ev => onClick(ev, type, player),
    ...(selected && {
        dismissible: {
          onClose: ev => onClick(ev, type, player),
        },
    }),
  }

  return (
    <Chip
      color={getChipColor()}
      variant={getChipVariant()}
      value={
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <span className="font-medium">{player.name}</span>
        </div>
      }
      className={`transition-all duration-200 ${
        selected
          ? 'shadow-md hover:shadow-lg'
          : 'hover:bg-gray-50 hover:border-gray-300'
      }`}
      {...attributes}
    />
  )
}
