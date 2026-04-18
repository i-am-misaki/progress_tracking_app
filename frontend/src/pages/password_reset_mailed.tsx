import { useNavigate } from "react-router-dom";

export default function PasswordResetMailed() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="w-[700px] h-[300px] rounded-md inset-shadow-md inset-shadow-white-500/50 bg-white/30 backdrop-blur-xl py-6 px-3">
                <div className="flex flex-col gap-12 py-4">
                    <div className="flex flex-col text-center gap-3">
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Changa', sans-serif" }}>Password Reset</h1>
                        <p className="text-center text-yellow-300 h-6 whitespace-pre-wrap">A password reset email has been sent to your email address.</p>
                        <div className="flex justify-center gap-12 items-center">
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

