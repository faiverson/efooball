import React, { useState, useRef, useEffect } from 'react'
import { Select, Option, Chip } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function TeamDropdown({
  name,
  teams,
  selected,
  onChange,
  label,
  error,
  disabled = false,
  placeholder = "Select a team"
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectedTeam = teams.find(team => team.id === selected)

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('-1');
  }

  const handleChange = (value) => {
    onChange(value);
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Select
        label={label}
        value={String(selected)}
        onChange={handleChange}
        error={error}
        disabled={disabled}
        className="w-full"
        color="blue"
        size="md"
        labelProps={{
          className: "text-sm font-medium text-neutral-700"
        }}
        menuProps={{
          className: "bg-white rounded-lg shadow-lg border border-neutral-200 z-50"
        }}
        containerProps={{
          className: "min-w-[200px]"
        }}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <Option value="-1" className="text-neutral-500">
          {placeholder}
        </Option>
        {teams.map(team => (
          <Option
            key={team.id}
            value={String(team.id)}
            className={`${selected === team.id ? 'bg-blue-50 text-blue-700' : 'text-neutral-700'}`}
          >
            {team.name}
          </Option>
        ))}
      </Select>
      {selected !== '-1' && selectedTeam && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Chip
            value={
              <div className="flex items-center gap-1 whitespace-nowrap">
                <span className="truncate max-w-[120px]">{selectedTeam.name}</span>
                <button
                  onClick={handleClear}
                  className="ml-1 p-0.5 rounded-full hover:bg-neutral-200 flex-shrink-0"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </div>
            }
            color="blue"
            variant="ghost"
            className="rounded-full bg-blue-50 text-blue-700"
          />
        </div>
      )}
    </div>
  )
}
