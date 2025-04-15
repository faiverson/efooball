export function useColor() {
    const getColor = (color, types = []) => {
        if (!color) return '';

        if (!types.length) return `bg-${color}-500 text-${color}-50`;

        return types.map(type => {
            if (type === 'bg') return `bg-${color}-500`;
            if (type === 'text') return `text-${color}-50`;
            if (type === 'border') return `border-${color}-200`;
            if (type === 'hover') return `hover:bg-${color}-600`;
            if (type === 'focus') return `focus:ring-${color}-500`;
            return '';
        }).join(' ');
    };

    return { getColor };
}
