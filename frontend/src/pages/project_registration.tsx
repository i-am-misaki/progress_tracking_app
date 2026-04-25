import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { IsEmpty } from "../libs/validation";


export default function ProjectRegistration() {
    const navigate = useNavigate();
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
                                                    className="w-full p-1 text-white focus:outline-none"
                                                    placeholder="e.g. Automatic writing of data"></textarea>
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
                                                    className="text-white" />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/3 p-10 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            PIC
                                        </th>
                                        <td>
                                            <div className="w-3/4 pt-10 pb-0.5">
                                                <input
                                                    type="text"
                                                    placeholder="Input PIC"
                                                    className="w-full pb-0.5 text-white focus:outline-none"/>
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