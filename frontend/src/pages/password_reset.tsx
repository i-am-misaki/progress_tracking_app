import { useNavigate } from "react-router-dom";


export default function PasswordReset() {
    const navigate = useNavigate();


    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="w-[700px] h-[300px] rounded-md inset-shadow-md inset-shadow-white-500/50 bg-white/30 backdrop-blur-xl py-6 px-3">
                <div className="flex flex-col gap-6 py-4">
                    <div className="flex flex-col text-center gap-3">
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Changa', sans-serif" }}>Password Reset</h1>
                        <p className="text-center text-black h-6 whitespace-pre-wrap">Password reset completed successfully.</p>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate('/login')} // ログイン画面に遷移
                            className="w-1/4 border border-white text-white py-2 px-4 mt-10 cursor-pointer hover:bg-white hover:text-slate-700 transition-colors"
                            style={{ fontFamily: "'Changa', sans-serif" }}
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
