import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import { IsEmpty } from "../libs/validation";
import type { Project } from "../types/project";

export interface User {
    uuid: string;
    name: string;
}



// 初期値の設定
const initialForm: Project = {
    project_name: '',
    project_summary: '',
    client: '',
    eta: '',
    pic: '',
    status: 'not_started',
    priority: 'medium',
    progress: ''
};



export default function ProjectRegistration() {
    const navigate = useNavigate();
    // PIC 選択用ユーザ情報
    const [users, setUsers] = useState<User[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // 全てのユーザ情報取得
    useEffect(() => {
        fetch('/api/member/users')
        .then(res => {
            if (!res.ok) {
                throw new Error(`サーバーエラー: ${res.status}`);
            }
            return res.json();
        })
        .then(data => setUsers(data))
        .catch(err => console.error("データ取得に失敗:", err));
    }, []);

    const filteredUsers = useMemo(() => {
        if (!inputValue) return [];

        return users.filter(user =>
            user.name.toLowerCase().includes(inputValue.toLowerCase())
        );
    }, [inputValue, users]);


    const [errMsg, setErrMsg] = useState('');
    const [formData, setFormData] = useState<Project>(initialForm);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value // name属性とProjectのキー名を一致させておく必要がある
        }));
    };

    const handleProjectRegistration = async () => {
        setErrMsg(""); // エラーをクリア
        let errMsgList: string[] = [];

        // projectName バリデーション
        const pnResult = IsEmpty(formData.project_name);
        if (!pnResult.isValid){
            errMsgList.push(pnResult.message);
        }
        // projectSummary バリデーション
        const psResult = IsEmpty(formData.project_summary);
        if (!psResult.isValid){
            errMsgList.push(psResult.message);
        }
        // client バリデーション
        const clientResult = IsEmpty(formData.client);
        if (!clientResult.isValid){
            errMsgList.push(clientResult.message);
        }
        // status バリデーション
        const statusResult = IsEmpty(formData.status);
        if (!statusResult.isValid){
            errMsgList.push(statusResult.message);
        }

        if (errMsgList.length > 0) {
            setErrMsg(errMsgList.join("\n"));
        } else{
            const payload = {
                ...formData,
                // 空文字だったら null に変換
                eta: formData.eta === '' ? null : formData.eta,
                pic: formData.pic === '' ? null : formData.pic
            };
            try {
                const response = await fetch('/api/member/project/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (response.ok) {
                    navigate("/projects");
                } else {
                    const errorData = await response.json();
                    setErrMsg(errorData.detail || 'Project registration failed.');
                }
            } catch (error) {
                setErrMsg('Server connection failed.');
            };
        }


    }


    return (
        <div className="h-screen w-screen">
            <div className="flex justify-between items-center px-8 py-4">
                <button
                    type="button"
                    className="border border-white text-white py-2 px-8 cursor-pointer hover:bg-white hover:text-black transition-colors"
                    onClick={() => navigate('/projects')}
                    >
                    Back
                </button>
                <button type="button"
                        className="border border-white text-white py-2 px-8 cursor-pointer hover:bg-white transition-colors">
                    <span className="text-base" style={{ fontFamily: "'Changa', sans-serif" }}>Logout</span>
                </button>
            </div>
            <div className="flex justify-center items-end">
                <div className="w-full h-[750px] rounded-md inset-shadow-md inset-shadow-white-500/50 bg-white/30 backdrop-blur-xl mx-4 py-6 px-3">
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col text-center gap-3">
                            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Changa', sans-serif" }}>Project Registration</h1>
                            <p id="err-msg" className="mb-2 text-center text-yellow-300 whitespace-pre-wrap">{errMsg}</p>
                            <table className="w-1/2 mx-auto border-collapse">
                                <tbody>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/4 pr-2 pt-6 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Project Name<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-full pt-6 pb-0.5">
                                                <input
                                                    type="text"
                                                    name="project_name"
                                                    value={formData.project_name}
                                                    onChange={handleChange}
                                                    placeholder="Input Project Name"
                                                    className="w-full pb-0.5 text-white focus:outline-none"/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/4 pr-2 pt-6 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Project Summary<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-full pt-6 pb-0.5">
                                                <textarea
                                                    name="project_summary"
                                                    value={formData.project_summary}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Automatic writing of data"
                                                    className="w-full p-1 text-white focus:outline-none"></textarea>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/4 pr-2 pt-6 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Client<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-full pt-6 pb-0.5">
                                                <input
                                                    type="text"
                                                    name="client"
                                                    value={formData.client}
                                                    onChange={handleChange}
                                                    placeholder="Input Client. e.g. General affairs department"
                                                    className="w-full pb-0.5 text-white focus:outline-none"/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/4 pr-2 pt-6 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            ETA
                                        </th>
                                        <td>
                                            <div className="w-1/3 pt-10 pb-0.5">
                                            <input
                                                type="date"
                                                name="eta"
                                                value={formData.eta ?? ""}
                                                onChange={handleChange}
                                                className="text-white text-left bg-transparent outline-none [&::-webkit-calendar-picker-indicator]:invert" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/4 pr-2 pt-6 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            PIC
                                        </th>
                                        <td>
                                            <div className="relative">
                                                <div className="w-full pt-6 pb-0.5">
                                                    <input
                                                        type="text"
                                                        name="pic"
                                                        placeholder="Search by name"
                                                        value={inputValue}
                                                        onChange={e => {setInputValue(e.target.value);
                                                            setIsOpen(true);
                                                        }}
                                                        onFocus={() => setIsOpen(true)}
                                                        // フォーカスが外れたら少し遅れて閉じる（クリックイベントを優先するため）
                                                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                                                        className="w-full pb-0.5 text-white focus:outline-none"
                                                    />
                                                    {/* 候補リストの表示 */}
                                                    {isOpen && filteredUsers.length > 0 && (
                                                        <ul className="absolute z-10 w-1/2 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg max-h-60 overflow-auto">
                                                        {filteredUsers.map((user) => (
                                                            <li
                                                            key={user.uuid}
                                                            onClick={() => {
                                                                setInputValue(user.name);
                                                                {handleChange};
                                                                setIsOpen(false);
                                                            }}
                                                            className="p-2 text-white text-left hover:bg-gray-700 cursor-pointer transition-colors"
                                                            >
                                                            {user.name}
                                                            </li>
                                                        ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/4 pr-2 pt-6 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Priority<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-full flex items-center gap-1 pt-6 pb-0.5">
                                                <div dir="ltr" >
                                                    <input
                                                        type="radio"
                                                        name="priority"
                                                        id="high"
                                                        value="high"
                                                        checked={formData.priority === "high"}
                                                        onChange={handleChange}
                                                        className="hidden peer" />
                                                    <label
                                                        htmlFor="high"
                                                        className="flex flex-col mx-auto text-center border border-white rounded-s-lg p-2 mb-0.5 text-white text-sm hover:bg-white hover:text-black peer-checked:bg-white peer-checked:text-black"
                                                        >
                                                        HIGH
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        name="priority"
                                                        id="medium"
                                                        value="medium"
                                                        checked={formData.priority === "medium"}
                                                        onChange={handleChange}
                                                        className="hidden peer" />
                                                    <label
                                                        htmlFor="medium"
                                                        className="flex flex-col mx-auto text-center border border-white p-2 mb-0.5 text-white text-sm hover:bg-white hover:text-black peer-checked:bg-white peer-checked:text-black"
                                                    >
                                                        MEDIUM
                                                    </label>
                                                </div>
                                                <div dir="rtl">
                                                    <input
                                                        type="radio"
                                                        name="priority"
                                                        id="low"
                                                        value="low"
                                                        checked={formData.priority === "low"}
                                                        onChange={handleChange}
                                                        className="hidden peer" />
                                                    <label
                                                        htmlFor="low"
                                                        className="flex flex-col mx-auto text-center border border-white rounded-s-lg p-2 mb-0.5 text-white text-sm hover:bg-white hover:text-black peer-checked:bg-white peer-checked:text-black"
                                                        >
                                                            LOW
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/4 pr-2 pt-6 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Status<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-full flex items-center gap-1 pt-6 pb-0.5">
                                                <div dir="ltr" >
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        id="in_progress"
                                                        value="in_progress"
                                                        checked={formData.status === "in_progress"}
                                                        onChange={handleChange}
                                                        className="hidden peer" />
                                                    <label
                                                        htmlFor="in_progress"
                                                        className="flex flex-col mx-auto text-center border border-white rounded-s-lg p-2 mb-0.5 text-white text-sm hover:bg-white hover:text-black peer-checked:bg-white peer-checked:text-black"
                                                        >
                                                        In Progress
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        id="on_hold"
                                                        value="on_hold"
                                                        checked={formData.status === "on_hold"}
                                                        onChange={handleChange}
                                                        className="hidden peer" />
                                                    <label
                                                        htmlFor="on_hold"
                                                        className="flex flex-col mx-auto text-center border border-white p-2 mb-0.5 text-white text-sm hover:bg-white hover:text-black peer-checked:bg-white peer-checked:text-black"
                                                    >
                                                        On Hold
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        id="canceled"
                                                        value="canceled"
                                                        checked={formData.status === "canceled"}
                                                        onChange={handleChange}
                                                        className="hidden peer" />
                                                    <label
                                                        htmlFor="canceled"
                                                        className="flex flex-col mx-auto text-center border border-white p-2 mb-0.5 text-white text-sm hover:bg-white hover:text-black peer-checked:bg-white peer-checked:text-black"
                                                    >
                                                        Canceled
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        id="not_started"
                                                        value="not_started"
                                                        checked={formData.status === "not_started"}
                                                        onChange={handleChange}
                                                        className="hidden peer" />
                                                    <label
                                                        htmlFor="not_started"
                                                        className="flex flex-col mx-auto text-center border border-white p-2 mb-0.5 text-white text-sm hover:bg-white hover:text-black peer-checked:bg-white peer-checked:text-black"
                                                        >
                                                        Not Started
                                                    </label>
                                                </div>
                                                <div dir="rtl">
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        id="completed"
                                                        value="completed"
                                                        checked={formData.status === "completed"}
                                                        onChange={handleChange}
                                                        className="hidden peer" />
                                                    <label
                                                        htmlFor="completed"
                                                        className="flex flex-col mx-auto text-center border border-white rounded-s-lg p-2 mb-0.5 text-white text-sm hover:bg-white hover:text-black peer-checked:bg-white peer-checked:text-black"
                                                        >
                                                            Completed
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/4 pr-2 pt-6 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Progress
                                        </th>
                                        <td>
                                            <div className="w-full pt-4 pb-0.5">
                                                <input
                                                    type="text"
                                                    name="progress"
                                                    value={formData.progress}
                                                    onChange={handleChange}
                                                    placeholder="Input Latest Progress"
                                                    className="w-full pb-0.5 text-white focus:outline-none"/>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-center items-center mt-4">
                                <button
                                    type="button"
                                    className="group border border-white text-white py-2 px-8 mt-6 cursor-pointer hover:bg-white hover:text-black transition-colors"
                                    onClick={handleProjectRegistration}
                                    >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}