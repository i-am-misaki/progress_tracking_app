import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login.tsx';
import ProjectProgressList from './pages/project_progress_list.tsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ログイン画面 */}
        <Route path="/login" element={<Login />} />

        {/* 案件進捗一覧画面 */}
        <Route path="/projects" element={<ProjectProgressList />} />

        {/* ルートURLにアクセスしたらログインへ飛ばす */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
