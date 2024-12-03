import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Dashboard() {
    const [users, setUsers] = useState([])

    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    useEffect(() => {
        // Use setTimeout only if you need to delay the fetch
        setTimeout(async() => {
            let response = await axios.request({url: "http://localhost:5000/users"});
            console.log(response.data);
            setUsers(response.data);
        }, 2000);  // The delay will be 2 seconds before fetching
    }, []);  // Empty dependency array to run the effect only once on mount

    return (
        <div>
            {/* Render users as a JSON string, can improve for better visualization */}
            <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
    )
}
