import React, { useState } from "react";
import { Button, Input, IconButton } from "@material-tailwind/react";
import GameVersionTags from "@/Components/GameVersionTags";
import TournamentTypeTags from "@/Components/TournamentTypeTags";
import DatePicker from "@/Components/DatePicker";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function StatsFilters({
    versions,
    minGames,
    from_at,
    until_at,
    tournamentTypes,
    onChangeTag,
    onChangeMinGames,
    handleChange,
    onChangeModality,
    onSubmit
}) {
    const handleClearMinGames = () => {
        const event = {
            target: {
                value: '',
                type: 'number'
            },
            preventDefault: () => {}
        };
        onChangeMinGames(event);
    };

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-neutral-200 sticky top-4">
            <h3 className="text-lg font-bold mb-4 text-primary-700">
                Filter Statistics
            </h3>

            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <div className="space-y-0.5">
                        <label className="text-xs font-medium text-neutral-500">Game Versions</label>
                        <div className="pl-0.5">
                            <GameVersionTags versions={versions} onChange={onChangeTag} />
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <label className="text-xs font-medium text-neutral-500">Tournament Types</label>
                        <div className="pl-0.5">
                            <TournamentTypeTags tournamentTypes={tournamentTypes} onChange={onChangeModality} />
                        </div>
                    </div>

                    <div className="relative group mt-1">
                        <Input
                            type="number"
                            min="1"
                            variant="outlined"
                            label="Played games"
                            value={minGames}
                            onChange={ev => onChangeMinGames(ev)}
                            className="focus:ring-primary-500 group-hover:[&::-webkit-inner-spin-button]:appearance-none group-hover:[&::-webkit-outer-spin-button]:appearance-none group-hover:[&::-moz-number-spin-box]:appearance-none [&>label]:text-primary-700 [&>div>input]:text-primary-900 [&>div]:border-primary-200 [&>div]:focus:border-primary-500 [&>div]:focus:ring-primary-500"
                        />
                        {minGames && (
                            <IconButton
                                variant="text"
                                size="sm"
                                className="!absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-neutral-100"
                                onClick={handleClearMinGames}
                            >
                                <XMarkIcon className="w-4 h-4 text-neutral-500" />
                            </IconButton>
                        )}
                    </div>
                    <div className="relative">
                        <DatePicker
                            label="Since"
                            value={from_at}
                            onChange={val => handleChange(val, 'from_at')}
                            className="focus:ring-primary-500"
                        />
                        {from_at && (
                            <IconButton
                                variant="text"
                                size="sm"
                                className="!absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-neutral-100"
                                onClick={() => handleChange(null, 'from_at')}
                            >
                                <XMarkIcon className="w-4 h-4 text-neutral-500" />
                            </IconButton>
                        )}
                    </div>
                    <div className="relative">
                        <DatePicker
                            label="Until"
                            value={until_at}
                            onChange={val => handleChange(val, 'until_at')}
                            className="focus:ring-primary-500"
                        />
                        {until_at && (
                            <IconButton
                                variant="text"
                                size="sm"
                                className="!absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-neutral-100"
                                onClick={() => handleChange(null, 'until_at')}
                            >
                                <XMarkIcon className="w-4 h-4 text-neutral-500" />
                            </IconButton>
                        )}
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button
                        onClick={onSubmit}
                        variant="filled"
                        className="bg-primary-600 hover:bg-primary-700 text-white w-full transition-colors duration-200 rounded-lg py-2.5"
                    >
                        Apply Filter
                    </Button>
                </div>
            </div>
        </div>
    );
}
