import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PersonInfoPage.css';

interface Specialization {
    id: number;
    specialization_name: string;
}
const PersonInfoPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [personInfo, setPersonInfo] = useState<{
        fname: string;
        lname: string;
        ezor: string;
        gender: string;
        cardDescription: string;
        phone: string;
        specializations?: Specialization[];
    } | null>(null);

    useEffect(() => {
        const fetchPersonInfo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/person/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPersonInfo(data);
                    console.log("Fetched person info from API:", data);
                    console.log(data)
                } else {
                    console.error('Failed to fetch person info');
                }
            } catch (error) {
                console.error('Error fetching person info:', error);
            }
        };

        fetchPersonInfo();
    }, [id]);

    if (!personInfo) {
        return <p>Loading...</p>;
    }

    return (
        <div className="person-info-page">
            <h1>{`${personInfo.fname} ${personInfo.lname}`}</h1>
            <p><strong>מין:</strong> {personInfo.gender}</p>
            <p><strong>איזור:</strong> {personInfo.ezor}</p>
            <p><strong>תיאור:</strong> {personInfo.cardDescription}</p>
            <p><strong>מס׳ טלפון:</strong> {personInfo.phone}</p>
            {/* Display Specializations */}
            <div>
                <strong>תחומי התמחות:</strong>
                {personInfo.specializations && personInfo.specializations.length > 0 ? (
                    <ul>
                        {personInfo.specializations.map((spec) => (
                            <li key={spec.id}>{spec.specialization_name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>אין תחומי התמחות</p>
                )}
            </div>

        </div>
    );
};

export default PersonInfoPage;
