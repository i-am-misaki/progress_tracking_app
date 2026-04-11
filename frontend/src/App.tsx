import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login.tsx';
import ProjectProgressList from './pages/project_progress_list.tsx';
import PasswordReset from './pages/password_reset.tsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ログイン画面 */}
        <Route path="/login" element={<Login />} />

        {/* パスワードリセット画面 */}
        <Route path="/password-reset" element={<PasswordReset />} />

        {/* 案件進捗一覧画面 */}
        <Route path="/projects" element={<ProjectProgressList />} />

        {/* ルートURLにアクセスしたらログインへ飛ばす */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
