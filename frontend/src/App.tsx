import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login.tsx';
import SignUp from './pages/sign_up.tsx';
import ProjectProgressList from './pages/project_progress_list.tsx';
import PasswordForget from './pages/password_forget.tsx';
import PasswordResetMailed from './pages/password_reset_mailed.tsx';
import PasswordResetting from './pages/password_resetting.tsx';
import PasswordReset from './pages/password_reset.tsx';
import Signed from './pages/signed.tsx';
import ProjectRegistration from './pages/project_registration.tsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ログイン画面 */}
        <Route path="/login" element={<Login />} />
        {/* サインアップ画面 */}
        <Route path="/sign-up" element={<SignUp />} />
        {/* サインアップ完了画面 */}
        <Route path="/signed" element={<Signed />} />

        {/* パスワードリセットメールアドレス入力画面 */}
        <Route path="/password_forget" element={<PasswordForget />} />
        {/* パスワードリセットメール送信完了画面 */}
        <Route path="/password_reset_mailed" element={<PasswordResetMailed />} />
        {/* パスワードリセット新パスワード入力画面 */}
        <Route path="/password_resetting" element={<PasswordResetting />} />
        {/* パスワードリセット完了画面 */}
        <Route path="/password_reset" element={<PasswordReset />} />

        {/* 案件進捗一覧画面 */}
        <Route path="/projects" element={<ProjectProgressList />} />
        {/* 案件登録画面 */}
        <Route path="/project/register" element={<ProjectRegistration />} />

        {/* ルートURLにアクセスしたらログインへ飛ばす */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
