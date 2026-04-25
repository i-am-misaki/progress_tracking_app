import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";


import { IsEmpty } from "../libs/validation";


export interface User {
    uuid: string;
    name: string;
}


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


    const [projectName, setProjectName] = useState('');
    const [projectSummary, setProjectSummary] = useState('');
    const [client, setClient] = useState('');
    const [eta, setEta] = useState('');
    const [status, setStatus] = useState('');
    const [progress, setProgress] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleProjectRegistration = async () => {
        setErrMsg(""); // エラーをクリア
        let errMsgList: string[] = [];

        // projectName バリデーション
        const pnResult = IsEmpty(projectName);
        if (!pnResult.isValid){
            errMsgList.push(pnResult.message);
        }
        // projectSummary バリデーション
        const psResult = IsEmpty(projectSummary);
        if (!psResult.isValid){
            errMsgList.push(psResult.message);
        }
        // client バリデーション
        const clientResult = IsEmpty(client);
        if (!clientResult.isValid){
            errMsgList.push(clientResult.message);
        }
        // status バリデーション
        const statusResult = IsEmpty(status);
        if (!statusResult.isValid){
            errMsgList.push(statusResult.message);
        }

        if (errMsgList.length > 0) {
            setErrMsg(errMsgList.join("\n"));
            return;
        }
    }


    return (
        <div className="h-screen w-screen">
            <div className="flex justify-end">
                <button type="button" className="border border-white text-white py-2 px-8 my-6 mx-8 cursor-pointer hover:bg-white transition-colors">
                    <span className="text-base" style={{ fontFamily: "'Changa', sans-serif" }}>Logout</span>
                </button>
            </div>
            <div className="flex justify-center items-end">
                <div className="w-full h-[750px] rounded-md inset-shadow-md inset-shadow-white-500/50 bg-white/30 backdrop-blur-xl mx-4 py-6 px-3">
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col text-center gap-3">
                            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Changa', sans-serif" }}>Project Registration</h1>
                            <p id="err-msg" className="text-center text-yellow-300 whitespace-pre-wrap">{errMsg}</p>
                            <table className="w-2/3 mx-auto border-collapse">
                                <tbody>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/3 p-10 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Project Name<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-3/4 pt-10 pb-0.5">
                                                <input
                                                    type="text"
                                                    value={projectName}
                                                    onChange={e => setProjectName(e.target.value)}
                                                    placeholder="Input Project Name"
                                                    className="w-full pb-0.5 text-white focus:outline-none"/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/3 p-10 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Project Summary<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-3/4 pt-10 pb-0.5">
                                                <textarea
                                                    value={projectSummary}
                                                    onChange={e => setProjectSummary(e.target.value)}
                                                    placeholder="e.g. Automatic writing of data"
                                                    className="w-full p-1 text-white focus:outline-none"></textarea>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/3 p-10 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Client<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-3/4 pt-10 pb-0.5">
                                                <input
                                                    type="text"
                                                    value={client}
                                                    onChange={e => setClient(e.target.value)}
                                                    placeholder="Input Client. e.g. General affairs department"
                                                    className="w-full pb-0.5 text-white focus:outline-none"/>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/3 p-10 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            ETA<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-3/4 pt-10 pb-0.5">
                                                <input
                                                    type="date"
                                                    value={eta}
                                                    onChange={e => setEta(e.target.value)}
                                                    className="text-white bg-transparent outline-none" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/3 p-10 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            PIC
                                        </th>
                                        <td>
                                            <div className="relative">
                                                <div className="w-3/4 pt-10 pb-0.5">
                                                    <input
                                                        type="text"
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
                                        <th scope="col" className="w-1/3 p-10 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Status<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-4/5 flex items-center gap-2 pt-10 pb-0.5">
                                                <div dir="ltr" >
                                                    <input
                                                        type="radio"
                                                        name="status"
                                                        id="in_progress"
                                                        value="in_progress"
                                                        checked={status === "in_progress"}
                                                        onChange={e => setStatus(e.target.value)}
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
                                                        checked={status === "on_hold"}
                                                        onChange={e => setStatus(e.target.value)}
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
                                                        checked={status === "canceled"}
                                                        onChange={e => setStatus(e.target.value)}
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
                                                        checked={status === "not_started"}
                                                        onChange={e => setStatus(e.target.value)}
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
                                                        checked={status === "completed"}
                                                        onChange={e => setStatus(e.target.value)}
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
                                        <th scope="col" className="w-1/3 p-10 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Progress
                                        </th>
                                        <td>
                                            <div className="w-3/4 pt-10 pb-0.5">
                                                <input
                                                    type="text"
                                                    value={progress}
                                                    onChange={e => setProgress(e.target.value)}
                                                    placeholder="Input Latest Progress"
                                                    className="w-full pb-0.5 text-white focus:outline-none"/>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-center items-center gap-4">
                                <button
                                    type="button"
                                    className="group border border-white text-white py-2 px-8 mt-6 cursor-pointer hover:bg-white hover:text-black transition-colors"
                                    onClick={() => navigate('/projects')}
                                    >
                                    Back
                                </button>
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