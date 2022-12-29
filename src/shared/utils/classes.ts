export const classes = (
  defaultClasses: string,
  additionalClasses?: string,
  mods?: { [key: string]: boolean },
) => {
  const modsClasses = mods
    ? Object.entries(mods)
        .map(([key, value]) => (value ? key : ''))
        .filter(Boolean)
        .join(' ')
    : '';
  return defaultClasses.concat(' ', additionalClasses || '', ' ', modsClasses);
};
