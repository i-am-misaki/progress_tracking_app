import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login.tsx';
import ProjectProgressList from './pages/project_progress_list.tsx';
import PasswordForget from './pages/password_forget.tsx';
import PasswordResetMailed from './pages/password_reset_mailed.tsx';
import PasswordReset from './pages/password_reset.tsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ログイン画面 */}
        <Route path="/login" element={<Login />} />

        {/* パスワードリセットメールアドレス入力画面 */}
        <Route path="/password_forget" element={<PasswordForget />} />
        {/* パスワードリセットメール送信完了画面 */}
        <Route path="/password_reset_mailed" element={<PasswordResetMailed />} />
        {/* パスワードリセット画面 */}
        <Route path="/password_reset" element={<PasswordReset />} />

        {/* 案件進捗一覧画面 */}
        <Route path="/projects" element={<ProjectProgressList />} />

        {/* ルートURLにアクセスしたらログインへ飛ばす */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
