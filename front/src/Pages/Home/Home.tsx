
//             <div>reset password (update password)</div>
//             <div>avatar and file</div>
//             <div>add what's missing to the form</div>
//             <div>add rules to the form</div>


// import { useNavigate } from "react-router-dom";
// import "./Home.css"; // Add styles separately

// const Home = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="home-container">
//             <div className="banner">
//                 <div className="banner-content">
//                     <h2>מחפשים פסיכולוג מומלץ קרוב לביתכם?</h2>
//                     <p>הגעתם למקום הנכון. אצלנו תמצא/י רק מטפלים בעלי הסמכה מוכרת.</p>
//                     <button onClick={() => navigate("/professionals")}>חיפוש מטפל</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;


import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Add styles separately

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Banner Section */}
            <div className="banner">
                <div className="banner-content">
                    <h1>מצא את הפסיכולוג המתאים לך בקלות</h1>
                    <p>פלטפורמה שמקשרת אותך לאנשי מקצוע מוסמכים בבריאות הנפש</p>
                    <button onClick={() => navigate("/professionals")}>התחל עכשיו</button>
                </div>
            </div>

            {/* About Us Section */}
            <section className="about-us">
                <h2>מי אנחנו?</h2>
                <p>
                    האתר שלנו נבנה מתוך צורך להנגיש טיפול פסיכולוגי לכל אחד.
                    אנו מאמינים שלכל אדם מגיע לקבל תמיכה נפשית מקצועית, בקלות ובמהירות.
                    הפלטפורמה שלנו מאפשרת לך למצוא אנשי מקצוע מוסמכים בתחומים שונים,
                    להשוות ביניהם ולבחור את המתאים לך ביותר.
                </p>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <h2>איך זה עובד?</h2>
                <div className="steps">
                    <div className="step">
                        <h3>🔍 חיפוש והתאמה</h3>
                        <p>חפש פסיכולוגים לפי אזור, תחום מומחיות וצרכים אישיים.</p>
                    </div>
                    <div className="step">
                        <h3>📞 יצירת קשר</h3>
                        <p>צור קשר ישיר עם המטפל, קבל מידע נוסף וקבע פגישה.</p>
                    </div>
                    <div className="step">
                        <h3>💙 התחלת טיפול</h3>
                        <p>התחל תהליך טיפולי מקצועי ומותאם אישית עבורך.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <h2>מה אנשים אומרים עלינו?</h2>
                <div className="testimonial">
                    <p>״הצלחתי למצוא פסיכולוג מדהים במהירות! השירות באתר מאוד נוח וקל לשימוש.״</p>
                    <h4>- דנה, תל אביב</h4>
                </div>
                <div className="testimonial">
                    <p>״הרגשתי אבוד ולא ידעתי לאן לפנות. האתר הזה עזר לי למצוא את העזרה שהייתי צריך.״</p>
                    <h4>- יונתן, חיפה</h4>
                </div>
            </section>
        </div>
    );
};

export default Home;
