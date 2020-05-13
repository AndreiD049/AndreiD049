import React, { useEffect } from 'react';

const Notification = (props) => {

    const colorMap = {
        "error": "red",
        "info": "green",
    };

    const styles = {
        color: colorMap[props.type],
    };


    useEffect(() => {
        const timerID = setTimeout(() => {
            props.reset('');
        }, 3000);
        return () => clearTimeout(timerID);
    }, [props]);

    return (
        <h1 style={styles}>{props.message}</h1>
    );
};

export default Notification;