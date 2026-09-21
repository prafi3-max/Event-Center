// ==========================================
// EVENTCENTER SUPABASE
// ==========================================

const SUPABASE_URL =
    "https://mdcyegwahbgyesvetetd.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_em0Exl8pVQ6Fvzj4kcbb7A_wbDxNfKw";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


// ==========================================
// SHOW LOGIN
// ==========================================

function showLogin() {

    document
        .getElementById("loginSection")
        .classList.add("active");

    document
        .getElementById("signupSection")
        .classList.remove("active");

    document
        .getElementById("otpSection")
        .classList.remove("active");
}


// ==========================================
// SHOW SIGNUP
// ==========================================
function showLogin() {
    document.getElementById("loginSection").classList.add("active");
    document.getElementById("signupSection").classList.remove("active");
}

function showSignup() {
    document.getElementById("loginSection").classList.remove("active");
    document.getElementById("signupSection").classList.add("active");
}


// ==========================================
// SHOW OTP
// ==========================================

function showOTP() {

    document
        .getElementById("loginSection")
        .classList.remove("active");

    document
        .getElementById("signupSection")
        .classList.remove("active");

    document
        .getElementById("otpSection")
        .classList.add("active");
}


// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;

            const message =
                document.getElementById(
                    "loginMessage"
                );

            message.style.color = "#7c3aed";
            message.textContent =
                "Logging in... ⏳";


            const { data, error } =
                await supabaseClient.auth
                    .signInWithPassword({
                        email: email,
                        password: password
                    });


            if (error) {

                message.style.color = "#dc2626";

                message.textContent =
                    error.message;

                return;
            }


            message.style.color = "#15803d";

            message.textContent =
                "Login successful! 🎉";


            setTimeout(function () {

                if (
                    data.user.id ===
                    "8d4dc524-6353-40b9-bdb3-924e88a8e715"
                ) {

                    window.location.href =
                        "admin-dashboard.html";

                } else {

                    window.location.href =
                        "dashboard.html";

                }

            }, 800);

        }
    );
}
// ==========================================
// NORMAL EMAIL CONFIRMATION SIGNUP
// ==========================================

async function handleSignup(event) {

    event.preventDefault();

    const message =
        document.getElementById("signupMessage");

    const signupName =
        document.getElementById("signupName").value.trim();

    const signupEmail =
        document.getElementById("signupContact").value.trim();

    const signupPassword =
        document.getElementById("signupPassword").value;

    const confirmPassword =
        document.getElementById("signupConfirmPassword").value;


    // ==========================================
    // FULL NAME
    // ==========================================

    if (!signupName) {

        message.style.color = "#dc2626";

        message.textContent =
            "Please enter your full name.";

        return;
    }


    // ==========================================
    // EMAIL
    // ==========================================

    if (
        !signupEmail ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)
    ) {

        message.style.color = "#dc2626";

        message.textContent =
            "Please enter a valid email.";

        return;
    }


    // ==========================================
    // PASSWORD
    // ==========================================

    if (signupPassword.length < 6) {

        message.style.color = "#dc2626";

        message.textContent =
            "Password must be at least 6 characters.";

        return;
    }


    // ==========================================
    // CONFIRM PASSWORD
    // ==========================================

    if (signupPassword !== confirmPassword) {

        message.style.color = "#dc2626";

        message.textContent =
            "Passwords do not match.";

        return;
    }


    // ==========================================
    // CREATE ACCOUNT
    // ==========================================

    message.style.color = "#7c3aed";

    message.textContent =
        "Creating your account... ⏳";


    const { data, error } =
        await supabaseClient.auth.signUp({

            email: signupEmail,

            password: signupPassword,

            options: {

                data: {
                    full_name: signupName
                },

                emailRedirectTo:
                    window.location.origin +
                    "/auth.html"

            }

        });


    // ==========================================
    // SIGNUP ERROR
    // ==========================================

    if (error) {

        console.error(
            "SIGNUP ERROR:",
            error
        );

        message.style.color =
            "#dc2626";

        message.textContent =
            error.message;

        return;
    }


    // ==========================================
    // SUCCESS
    // ==========================================

    message.style.color =
        "#15803d";

    message.textContent =
        "Account created! 📩 Please check your email and click the confirmation link.";


    // Clear signup form

    document
        .getElementById("signupForm")
        .reset();
}


// ==========================================
// LOGOUT
// ==========================================

async function logout() {

    const { error } =
        await supabaseClient.auth
            .signOut();


    if (error) {

        alert(error.message);

        return;
    }


    window.location.href =
        "auth.html";
}