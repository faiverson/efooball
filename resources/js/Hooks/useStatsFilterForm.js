import { useState } from 'react';
import { DateTime } from 'luxon';
import { GameVersion, TournamentType } from '@/lib/enums';
import axios from '@/lib/axios';

export function useStatsFilterForm({ baseUrl, data, current_version, start_at, end_at, min_amount }) {
    const [stats, setStats] = useState(data ?? []);
    const [versions, setVersions] = useState(Object.keys(GameVersion).map(item => ({active: current_version === item.toLowerCase(), name: item})));
    const [tournamentTypes, setTournamentTypes] = useState(Object.keys(TournamentType).map(item => ({active: true, name: item})));
    const [minGames, setMinGames] = useState(min_amount);
    const [from_at, setFromAt] = useState(DateTime.fromFormat(start_at, 'yyyy-MM-dd'));
    const [until_at, setUntilAt] = useState(DateTime.fromFormat(end_at, 'yyyy-MM-dd'));

    const onChangeTag = tag => {
        const newVersions = [...versions];
        const idx = newVersions.findIndex(item => item.name === tag);
        newVersions[idx].active = !newVersions[idx].active;
        setVersions(newVersions);
    };

    const onChangeModality = tag => {
        const newTournamentTypes = [...tournamentTypes];
        const idx = newTournamentTypes.findIndex(item => item.name === tag);
        newTournamentTypes[idx].active = !newTournamentTypes[idx].active;
        setTournamentTypes(newTournamentTypes);
    };

    const onChangeMinGames = ev => {
        ev.preventDefault();
        setMinGames(ev.target.value);
    };

    const handleChange = (value, field) => {
        let date = null;
        if (value && value.target) {
            // Handle event object
            value.preventDefault();
            date = value.target.value ? DateTime.fromFormat(value.target.value, 'yyyy-MM-dd') : null;
        } else {
            // Handle direct date value
            date = value;
        }

        if(field === 'from_at') {
            setFromAt(date);
        } else if(field === 'until_at') {
            setUntilAt(date);
        }
    };

    const onSubmit = async (ev, additionalFilters = '') => {
        ev.preventDefault();
        let filters = `versions=${versions.filter(item => item.active).map(item => item.name).join(',')}`;
        filters += `&modality=${tournamentTypes.filter(item => item.active).map(item => item.name).join(',')}`;

        if(!!minGames) {
            filters += `&min_amount=${minGames}`;
        }

        if(!!from_at) {
            filters += `&start_at=${from_at.toFormat('yyyy-MM-dd')}`;
        }

        if(!!until_at) {
            filters += `&end_at=${until_at.toFormat('yyyy-MM-dd')}`;
        }

        if (additionalFilters) {
            filters += `&${additionalFilters}`;
        }

        const response = await axios.get(`/${baseUrl}?${filters}`)
            .then(res => res.data)
            .catch(error => console.log(error));

        setStats(response?.data ?? []);
    };

    return {
        stats,
        versions,
        tournamentTypes,
        minGames,
        from_at,
        until_at,
        onChangeTag,
        onChangeModality,
        onChangeMinGames,
        handleChange,
        onSubmit
    };
}
