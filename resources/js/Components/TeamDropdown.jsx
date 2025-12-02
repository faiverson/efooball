import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Input } from '@material-tailwind/react';
import React, { useState, useRef, useEffect } from 'react';

export default function TeamDropdown({
    teams,
    selected,
    onChange,
    label,
    error,
    disabled = false,
    placeholder,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Reset focused index when search changes or dropdown opens
    useEffect(() => {
        setFocusedIndex(-1);
    }, [searchTerm, isOpen]);

    // Scroll focused item into view
    useEffect(() => {
        if (isOpen && listRef.current && focusedIndex >= 0) {
            const list = listRef.current;
            const element = list.children[focusedIndex];
            if (element) {
                element.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [focusedIndex, isOpen]);

    const selectedTeam = teams.find((team) => team.id === selected);

    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClear = (e) => {
        e.stopPropagation();
        onChange('-1');
        setSearchTerm('');
    };

    const handleSelect = (teamId) => {
        onChange(String(teamId));
        setIsOpen(false);
        setSearchTerm('');
    };

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleKeyDown = (e) => {
        if (disabled) return;

        if (!isOpen) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            setFocusedIndex((prev) =>
                prev < filteredTeams.length - 1 ? prev + 1 : prev
            );
            break;
        case 'ArrowUp':
            e.preventDefault();
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
            break;
        case 'Enter':
            e.preventDefault();
            if (focusedIndex >= 0 && focusedIndex < filteredTeams.length) {
                handleSelect(filteredTeams[focusedIndex].id);
            } else if (filteredTeams.length === 1) {
                // Convenience: if only one result, select it on Enter even if not focused
                handleSelect(filteredTeams[0].id);
            }
            break;
        case 'Escape':
            e.preventDefault();
            setIsOpen(false);
            break;
        case 'Tab':
            setIsOpen(false);
            break;
        }
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                onClick={toggleDropdown}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
            >
                <Input
                    label={label}
                    value={isOpen ? searchTerm : (selectedTeam ? selectedTeam.name : '')}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (!isOpen) setIsOpen(true);
                    }}
                    error={error}
                    disabled={disabled}
                    className="w-full cursor-pointer"
                    color="blue"
                    size="md"
                    icon={
                        <ChevronDownIcon
                            className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                    }
                    placeholder={isOpen ? 'Type to search...' : placeholder}
                    containerProps={{
                        className: 'min-w-[200px]',
                    }}
                    labelProps={{
                        className: 'text-sm font-medium text-neutral-700',
                    }}
                    readOnly={!isOpen && !!selectedTeam}
                    // Pass keydown to input as well to capture typing vs navigation
                    onKeyDown={handleKeyDown}
                />
            </div>

            {isOpen && (
                <div
                    ref={listRef}
                    className={
                        'absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg ' +
                        'border border-neutral-200 z-50 max-h-60 overflow-y-auto'
                    }
                >
                    {filteredTeams.length > 0 ? (
                        filteredTeams.map((team, index) => (
                            <div
                                key={team.id}
                                onClick={() => handleSelect(team.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handleSelect(team.id);
                                    }
                                }}
                                role="option"
                                aria-selected={focusedIndex === index}
                                tabIndex={0}
                                className={
                                    'px-4 py-2 cursor-pointer ' +
                                    `${
                                        selected === String(team.id) ||
                                        focusedIndex === index
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-neutral-700 hover:bg-blue-50 hover:text-blue-700'
                                    }`
                                }
                            >
                                {team.name}
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-neutral-500">No results found</div>
                    )}
                </div>
            )}

            {selected !== '-1' && selectedTeam && !isOpen && (
                <div
                    className="absolute top-2.5 right-8 cursor-pointer"
                    onClick={handleClear}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            handleClear(e);
                        }
                    }}
                    role="button"
                    tabIndex={0}
                >
                    <XMarkIcon className="h-5 w-5 text-neutral-500 hover:text-neutral-700" />
                </div>
            )}
        </div>
    );
}
