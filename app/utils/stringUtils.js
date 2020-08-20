export const getInitials = name => {
  let initials = Array.prototype.map
    .call(name.split(' '), function(x) {
      return x.substring(0, 1).toUpperCase();
    })
    .join('');
  return initials.substring(0, 2);
};

export const truncStr = (string, limit) => {
  return string.length > limit
    ? string
        .trim()
        .substring(0, limit - 3)
        .trim() + "..."
    : string;
};
