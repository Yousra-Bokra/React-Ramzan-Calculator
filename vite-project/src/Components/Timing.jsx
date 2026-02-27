import React from 'react'
import { useState } from "react";

const Timing = () => {
    const [date, setDate] = useState("");
    const [data, setData] = useState(null);

    const getTimings = async (selectedDate) => {
        const response = await fetch(
            `https://api.aladhan.com/v1/timingsByCity/${selectedDate}?city=Karachi&country=Pakistan&method=2`
        );
        const result = await response.json();
        setData(result.data);
    };

    const handleChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);

        if (selectedDate) {
            const formattedDate = selectedDate.split("-").reverse().join("-");
            getTimings(formattedDate);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

                    <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
                        Ramzan 2026 Calculater
                    </h1>

                    <input
                        type="date"
                        value={date}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {data && (
                        <div className="space-y-3 text-lg">

                            <p><strong>Day</strong> {data.date.gregorian.weekday.en}</p>
                            <p><strong>Month:</strong> {data.date.gregorian.month.en}</p>

                            <p className="text-green-600 font-semibold">
                                 Sahri: {data.timings.Fajr}
                            </p>

                            <p className="text-red-600 font-semibold">
                                Aftar: {data.timings.Maghrib}
                            </p>

                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Timing;
