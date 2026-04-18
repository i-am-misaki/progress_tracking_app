import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PasswordValidation } from "../libs/validation";

export default function PasswordResetting() {
    // パスワードリセット画面に遷移する際に、URLのクエリパラメータからトークンを取得する
    const { state } = useLocation();
    const token = state?.token;
    if (!token) {
        return <p>This has expired. Please try again.</p>;
    }

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const handleResetPassword = async () => {
        setErrMsg(""); // エラーをクリア

        if (password !== confirmPassword) {
            setErrMsg("Passwords do not match.");
            return;
        }
        const passwordValidation = PasswordValidation(password);
        if (!passwordValidation.isValid) {
            setErrMsg(passwordValidation.message);
            return;
        }

        // パスワードリセットの処理をここに実装する
        try {
            const response = await fetch("/api/guest/password_resetting", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, token }),
            });

            const data = await response.json();
            const statusCode = data.status_code;
            if (statusCode === '200') {
                navigate('/password_reset');
            } else if (statusCode === '404') {
                navigate('/login');
            } else {
                const errorData = await response.json();
                setErrMsg(errorData.detail || "Failed to reset password.");
            }
        } catch (error) {
            setErrMsg("Server connection failed.");
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="w-[700px] h-[370px] rounded-md inset-shadow-md inset-shadow-white-500/50 bg-white/30 backdrop-blur-xl py-6 px-3">
                <div className="flex flex-col gap-12 py-4">
                    <div className="flex flex-col text-center gap-3">
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Changa', sans-serif" }}>Password Reset</h1>
                        {/* エラーメッセージ */}
                        <p id="err-msg" className="text-center text-yellow-300 h-6 whitespace-pre-wrap">{errMsg}</p>
                        <div className="flex flex-col gap-6 justify-center items-center">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-3/5 px-2 py-1 border-b border-white text-white placeholder:text-slate-200 focus:outline-none bg-transparent"
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-3/5 px-2 py-1 border-b border-white text-white placeholder:text-slate-200 focus:outline-none bg-transparent"
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className="w-1/4 border border-white text-white py-2 px-4 mt-10 cursor-pointer hover:bg-white hover:text-slate-700 transition-colors"
                                style={{ fontFamily: "'Changa', sans-serif" }}
                            >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
