import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import visibilityIcon from '../assets/icons/visibility.svg';
import { EmailValidation, PasswordValidation } from '../libs/validation';
import ProjectProgressList from '../pages/project_progress_list';


export default function Login() {
    const navigate = useNavigate();

    // 入力値を管理する「状態（State）」
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // ログイン処理
    const handleLogin = async () => {
        setErrMsg(""); // エラーをクリア
        let errMsgList: string[] = [];

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
        setErrMsg(errMsgList.join("\n"));
        } else {
            try {
            const response = await fetch("/api/guest/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
        
            if (response.ok) {
                const data = await response.json();
                alert("Login Success!");
                // console.log("Token:", data.access_token);
                // ここで、トークンを保存して、プロジェクト進捗リストページに遷移する処理を実装する
                navigate("/projects"); 
            } else {
                const errorData = await response.json();
                setErrMsg(errorData.detail || "Login failed.");
            }
            } catch (error) {
            setErrMsg("Server connection failed.");
            }
        };
        }


  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[500px] h-3/4 rounded-md inset-shadow-md inset-shadow-white-500/50 bg-white/30 backdrop-blur-xl py-6 px-3">
        <div className="flex flex-col gap-12 py-4">
          <div className="flex flex-col text-center gap-3">
            <h2 className="text-6xl text-black" style={{ fontFamily: "'Changa', sans-serif" }}>USER LOGIN</h2>
            <h4 className="text-md text-black" style={{ fontFamily: "'Changa', sans-serif" }}>Sign in to your account</h4>
          </div>
          
          {/* エラーメッセージ */}
          <p id="err-msg" className="text-center text-yellow-300 h-6 whitespace-pre-wrap">{errMsg}</p>

          <div className="flex flex-col justify-center items-center gap-6 mx-6">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 入力された値をstateに保存
              className="w-full px-2 py-1 border-b border-white text-white placeholder:text-slate-200 focus:outline-none bg-transparent"
            />
            
            <div className="relative flex w-full">
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-1 pr-10 border-b border-white text-white placeholder:text-slate-200 focus:outline-none focus:bg-transparent bg-transparent"
              />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-transparent">
                <img src={visibilityIcon} className="w-5 h-5" alt="toggle password" />
              </button>
            </div>

            <div className="flex flex-col w-full text-white">
              <button type="button" className="w-fit self-end cursor-pointer text-end hover:text-gray-700">
                <span className="text-base" style={{ fontFamily: "'Changa', sans-serif" }}>Forget password ?</span>
              </button>
              <button type="button" className="w-fit self-end cursor-pointer text-end hover:text-gray-700">
                <span className="text-base" style={{ fontFamily: "'Changa', sans-serif" }}>Sign Up</span>
              </button>
            </div>

            <button 
              type="button" 
              onClick={handleLogin} // クリック時に実行
              className="group border border-white py-2 px-8 mt-6 cursor-pointer hover:bg-white transition-colors"
            >
              <span className="text-white group-hover:text-slate-700" style={{ fontFamily: "'Changa', sans-serif" }}>LOGIN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
