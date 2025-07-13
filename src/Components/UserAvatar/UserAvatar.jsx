import React from 'react';

const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

const getColor = (name) => {
    const colors = ["#1B0981", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
};

const UserAvatar = ({ name, size = 40 }) => {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                backgroundColor: getColor(name),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: size / 2,
                fontWeight: "bold",
                flexShrink: 0,
            }}
        >
            {getInitial(name)}
        </div>
    );
};

export default UserAvatar;
