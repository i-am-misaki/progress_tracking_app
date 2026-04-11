import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmailValidation } from '../libs/validation';


export default function PasswordReset() {
     const navigate = useNavigate();

     const [email, setEmail] = useState('');
     const [errMsg, setErrMsg] = useState('');

     const handleSendResetMail = () => {
        setErrMsg(""); // エラーをクリア

        const emailValidation = EmailValidation(email);
        if (!emailValidation.isValid) {
            setErrMsg(emailValidation.message);
        } else {
            // パスワードリセットメール送信の処理をここに実装する
            console.log("Send reset mail to:", email);
        }
     }


     return (
         <div className="h-screen w-screen flex justify-center items-center">
             <div className="w-[700px] h-[300px] rounded-md inset-shadow-md inset-shadow-white-500/50 bg-white/30 backdrop-blur-xl py-6 px-3">
                 <div className="flex flex-col gap-12 py-4">
                     <div className="flex flex-col text-center gap-3">
                        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Changa', sans-serif" }}>Password Reset</h1>
                        {/* エラーメッセージ */}
                        <p id="err-msg" className="text-center text-yellow-300 h-6 whitespace-pre-wrap">{errMsg}</p>
                        <div className="flex justify-center">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // 入力された値をstateに保存
                                className="w-3/5 px-2 py-1 border-b border-white text-white placeholder:text-slate-200 focus:outline-none bg-transparent"
                                />
                        </div>
                        <div className="flex justify-center gap-12 items-center">
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="group w-1/4 border border-white py-2 px-4 mt-6 cursor-pointer hover:bg-white transition-colors"
                                >
                                <span className="text-white group-hover:text-slate-700" style={{ fontFamily: "'Changa', sans-serif" }}>Back to Login</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleSendResetMail}
                                className="group w-1/4 border border-white py-2 px-4 mt-6 cursor-pointer hover:bg-white transition-colors"
                                >
                                <span className="text-white group-hover:text-slate-700" style={{ fontFamily: "'Changa', sans-serif" }}>Send Reset Mail</span>
                            </button>
                        </div>
                     </div>
                 </div>
             </div>
         </div>
     );
 }
