import { useContext, useState } from 'react';
import './Register.css';
import arrForEzoremItems from '../../ArraryFiles/EzoremArr';
import { MyContext } from '../../state/MyContext';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const { setRegisteringPerson, setIsLoggedIn, setToken, setLoggedInUserId, specializations } = useContext(MyContext);
    const navigate = useNavigate();
    const [selectedSpecializations, setSelectedSpecializations] = useState<number[]>([]); // Stores selected specialization IDs

    const [registerFormData, setRegisterFormData] = useState({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        gender: "",
        cardDescription: "",
        ezor: "",
        password: "",
        sogeTipul: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handles both normal inputs and multi-selection
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, fieldName: string) => {
        e.preventDefault();

        if (fieldName === "specializations") {
            const selectedOptions = Array.from((e.target as HTMLSelectElement).selectedOptions, option => Number(option.value));
            setSelectedSpecializations(selectedOptions);
        } else {
            const value = e.target.type === "file" ? (e.target as HTMLInputElement).files?.[0] || null : e.target.value;
            setRegisterFormData({ ...registerFormData, [fieldName]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const fullFormData = {
                ...registerFormData,
                specializations: selectedSpecializations, // Include selected checkboxes
            };
            console.log("Submitting Form Data:", fullFormData);
            setRegisteringPerson(fullFormData);

            const response = await fetch("http://localhost:3001/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fullFormData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registration response:", data);
                setSuccess("Registration successful!");

                localStorage.setItem('userToken', data.token);
                localStorage.setItem("userId", String(data.id));

                setIsLoggedIn(true);
                setToken(data.token);
                setLoggedInUserId(data.id);

                navigate(`/profile/${data.id}`);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to register. Please try again.");
            }
        } catch (err) {
            setError("Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='formParent'>
                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="fname">שם פרטי</label>
                        <input type="text" onChange={(e) => handleInputChange(e, "fname")} placeholder="first name" required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="lname">שם משפחה</label>
                        <input type="text" onChange={(e) => handleInputChange(e, "lname")} placeholder="last name" required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="phone">מס טלפון</label>
                        <input type="text" onChange={(e) => handleInputChange(e, "phone")} placeholder="phone" required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="email">אימייל</label>
                        <input type="text" onChange={(e) => handleInputChange(e, "email")} placeholder="email" required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="gender">מין</label>
                        <select onChange={(e) => handleInputChange(e, "gender")} required>
                            <option value="" disabled selected>בחר מין</option>
                            <option value="female">נקבה</option>
                            <option value="male">זכר</option>
                        </select>
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="ezor">איזור</label>
                        <select onChange={(e) => handleInputChange(e, "ezor")} required>
                            <option value="" disabled selected>בחר איזור</option>
                            {arrForEzoremItems.map((ezor, index) => (
                                <option key={index} value={ezor}>
                                    {ezor}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <div className='formChildren'>
                        <label className='labelStyling' htmlFor="sogeTipul">סוגי הטיפול</label>
                        <select onChange={(e) => handleInputChange(e, "sogeTipul")} required>
                            <option value="" disabled selected>בחר סוגי הטיפול</option>
                            <option value="CBT">CBT</option>
                            <option value="tipulPse5ology">טיפול פסיכולוגי</option>
                            <option value="ev7onem">אבחונים</option>
                        </select>
                    </div> */}

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="cardDescription">תיאור קצר</label>
                        <input type="text" onChange={(e) => handleInputChange(e, "cardDescription")} placeholder="cardDescription" required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling' htmlFor="password">סיסמה</label>
                        <input type="password" onChange={(e) => handleInputChange(e, "password")} placeholder="password" required />
                    </div>

                    <div className='formChildren'>
                        <label className='labelStyling'>תחומי התמחות:</label>
                        <div className="specializations-container">
                            {specializations.length > 0 ? (
                                specializations.map((spec) => (
                                    <label key={spec.id} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            value={spec.id}
                                            onChange={(e) => {
                                                const value = Number(e.target.value);
                                                setSelectedSpecializations((prev) =>
                                                    prev.includes(value)
                                                        ? prev.filter((id) => id !== value)
                                                        : [...prev, value]
                                                );
                                            }}
                                            checked={selectedSpecializations.includes(spec.id)}
                                        />
                                        {spec.specialization_name}
                                    </label>
                                ))
                            ) : (
                                <p>Loading specializations...</p> // Temporary UI to prevent errors
                            )}
                        </div>
                    </div>


                    <input className='submitButton' type="submit" value="Submit" />

                    {/* Display success or error message */}
                    {success && <p className="successMessage">{success}</p>}
                    {error && <p className="errorMessage">{error}</p>}
                    {loading && <p>Loading...</p>}
                </div>
            </form>
        </div>
    );
};

export default Register;
