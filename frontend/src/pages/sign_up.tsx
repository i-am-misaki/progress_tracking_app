import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { EmailValidation, PasswordValidation, IsEmpty } from "../libs/validation";
import { EMPTY_MSG } from '../configs/validation_messages';
import visibilityIcon from '../assets/icons/visibility.svg';

export default function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const handleSignUp = async () => {
        setErrMsg(""); // エラーをクリア
        let errMsgList: string[] = [];

        if (password !== confirmPassword) {
            errMsgList.push("Passwords do not match.");
        }

        if (!IsEmpty(name).isValid) {
            errMsgList.push(EMPTY_MSG);
        }

        // メールアドレスのバリデーション
        const emailValidation = EmailValidation(email);
        if (!emailValidation.isValid) {
            errMsgList.push(emailValidation.message);
        }

        // パスワードのバリデーション
        const passwordValidation = PasswordValidation(password);
        if (!passwordValidation.isValid) {
            errMsgList.push(passwordValidation.message);
        }

        if (errMsgList.length > 0) {
          setErrMsg(errMsgList.join('\n'));
        } else {
          try {
            const response = await fetch("/api/guest/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            const statuCode = response.status;
            if (statuCode === 200) {
              navigate("/signed");
            } else {
              setErrMsg(data.detail || "Sign up failed.");
            }
          } catch (error) {
            setErrMsg("Server connection failed.");
          }
        }
    }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-[500px] h-3/4 rounded-md inset-shadow-md inset-shadow-white-500/50 bg-white/30 backdrop-blur-xl py-6 px-3">
            <div className="flex flex-col gap-12 py-4">
                <div className="flex flex-col text-center gap-3">
                    <h1 className="text-2xl font-bold" style={{ fontFamily: "'Changa', sans-serif" }}>Sign Up</h1>
                    <p style={{ fontFamily: "'Changa', sans-serif" }}>Create your account to get started.</p>
                </div>
                {/* error message */}
                <p className="text-yellow-300 text-center whitespace-pre-wrap">{errMsg}</p>
                <div className="flex flex-col gap-6">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-2 py-1 border-b border-white text-white placeholder:text-slate-200 focus:outline-none bg-transparent"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-2 py-1 border-b border-white text-white placeholder:text-slate-200 focus:outline-none bg-transparent"
                    />
                    <div className="relative flex w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-2 py-1 border-b border-white text-white placeholder:text-slate-200 focus:outline-none bg-transparent"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent">
                            <img src={visibilityIcon} className="w-5 h-5" alt="toggle password" />
                        </button>
                    </div>
                    <div className="relative flex w-full">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-2 py-1 border-b border-white text-white placeholder:text-slate-200 focus:outline-none bg-transparent"
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent">
                            <img src={visibilityIcon} className="w-5 h-5" alt="toggle password" />
                        </button>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <button
                            type="button"
                            onClick={handleSignUp} // クリック時に実行
                            className="border border-white text-white py-2 px-8 mt-6 cursor-pointer hover:bg-white hover:text-black transition-colors"
                            style={{ fontFamily: "'Changa', sans-serif" }}
                        >
                            Sign Up
                        </button>
                        <button
                            type="button"
                            className="border border-white text-white py-2 px-8 mt-6 cursor-pointer hover:bg-white hover:text-black transition-colors"
                            style={{ fontFamily: "'Changa', sans-serif" }}
                            onClick={() => navigate('/login')}
                        >
                            Back to Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}