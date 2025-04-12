export const parseTag = (tag) => {
  return tag.replace(/_/g, ' ');
};

export const groupMatchesByVersion = (matches) => {
  return matches.reduce((acc, match) => {
    const version = match.version;
    if (!acc[version]) {
      acc[version] = [];
    }
    acc[version].push(match);
    return acc;
  }, {});
};

export const groupMatchesByDate = (matches) => {
  return matches.reduce((acc, match) => {
    const date = new Date(match.played_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {});
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
