function getProfileImage(name) {
    const initials = name.split(" ").map(word => word[0]).join("");
    return `https://via.placeholder.com/100?text=${initials}`;
}
