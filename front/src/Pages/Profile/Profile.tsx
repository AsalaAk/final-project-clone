import { useEffect, useState, useContext } from 'react';
import { MyContext } from '../../state/MyContext';
import { useNavigate, useParams } from 'react-router-dom';

type UserInfo = {
    id: number;
    fname: string;
    lname: string;
    email: string;
    gender: string;
    ezor: string;
    cardDescription: string;
};


const Profile = () => {
    const { token, loggedInUserId } = useContext(MyContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState("");
    const [editedValue, setEditedValue] = useState("");

    useEffect(() => {
        if (!token || Number(loggedInUserId) !== Number(id)) {
            console.error("Unauthorized access attempt.");
            navigate('/');
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/profile/${id}`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id, token, loggedInUserId, navigate]);

    const handleEditClick = (fieldName: keyof UserInfo) => {
        setEditingField(fieldName);
        setEditedValue(userInfo ? userInfo[fieldName] as string : ""); // Null check
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedValue(e.target.value);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/profile/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ [editingField]: editedValue }),
            });

            if (response.ok) {
                setUserInfo((prev) => ({ ...prev!, [editingField]: editedValue })); // Using `!` ensures `prev` is treated as an object
                setEditingField("");
            } else {
                console.error("Error updating profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleCancel = () => {
        setEditingField("");
        setEditedValue("");
    };

    if (loading) return <p>Loading...</p>;
    if (!userInfo) return <p>Error loading profile.</p>;

    return (
        <div className="profile-container">
            <h2 className="profile-header">אישור אישי</h2>

            <div className="profile-field">
                <strong>שם פרטי: </strong>
                {editingField === "fname" ? (
                    <div className="input-container">
                        <input className="profile-input" type="text" value={editedValue} onChange={handleInputChange} />
                        <button className="save-button" onClick={handleSave}>שמור</button>
                        <button className="cancel-button" onClick={handleCancel}>ביטול</button>
                    </div>
                ) : (
                    <>
                        <span className="profile-text">{userInfo.fname}</span>
                        <button className="edit-button" onClick={() => handleEditClick("fname")}>עריכה</button>
                    </>
                )}
            </div>

            <div className="profile-field">
                <strong> שם משפחה: </strong>
                {editingField === "lname" ? (
                    <div className="input-container">
                        <input className="profile-input" type="text" value={editedValue} onChange={handleInputChange} />
                        <button className="save-button" onClick={handleSave}>שמור</button>
                        <button className="cancel-button" onClick={handleCancel}>ביטול</button>
                    </div>
                ) : (
                    <>
                        <span className="profile-text">{userInfo.lname}</span>
                        <button className="edit-button" onClick={() => handleEditClick("lname")}>עריכה</button>
                    </>
                )}
            </div>

            <div className="profile-field">
                <strong>אימייל: </strong>
                <span className="profile-text">{userInfo.email}</span> {/* Email should not be editable */}
            </div>

            <div className="profile-field">
                <strong>מין: </strong>
                {editingField === "gender" ? (
                    <div className="input-container">
                        <input className="profile-input" type="text" value={editedValue} onChange={handleInputChange} />
                        <button className="save-button" onClick={handleSave}>שמור</button>
                        <button className="cancel-button" onClick={handleCancel}>ביטול</button>
                    </div>
                ) : (
                    <>
                        <span className="profile-text">{userInfo.gender}</span>
                        <button className="edit-button" onClick={() => handleEditClick("gender")}>עריכה</button>
                    </>
                )}
            </div>

            <div className="profile-field">
                <strong>איזור: </strong>
                {editingField === "ezor" ? (
                    <div className="input-container">
                        <input className="profile-input" type="text" value={editedValue} onChange={handleInputChange} />
                        <button className="save-button" onClick={handleSave}>שמור</button>
                        <button className="cancel-button" onClick={handleCancel}>ביטול</button>
                    </div>
                ) : (
                    <>
                        <span className="profile-text">{userInfo.ezor}</span>
                        <button className="edit-button" onClick={() => handleEditClick("ezor")}>עריכה</button>
                    </>
                )}
            </div>

            <div className="profile-field">
                <strong>תיאור קצר: </strong>
                {editingField === "cardDescription" ? (
                    <div className="input-container">
                        <input className="profile-input" type="text" value={editedValue} onChange={handleInputChange} />
                        <button className="save-button" onClick={handleSave}>שמור</button>
                        <button className="cancel-button" onClick={handleCancel}>ביטול</button>
                    </div>
                ) : (
                    <>
                        <span className="profile-text">{userInfo.cardDescription}</span>
                        <button className="edit-button" onClick={() => handleEditClick("cardDescription")}>עריכה</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
