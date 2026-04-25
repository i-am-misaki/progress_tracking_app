import { useNavigate } from "react-router-dom";
import { useState } from "react";




export default function ProjectRegistration() {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [projectSummary, setProjectSummary] = useState('');
    const [client, setClient] = useState('');
    const [eta, setEta] = useState('');
    const [status, setStatus] = useState('');
    const [progress, setProgress] = useState('');
    const [errMsg, setErrMsg] = useState('');


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
                        </div>
                        <div className="w-full">
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
                                            PIC<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-3/4 pt-10 pb-0.5">
                                                <select className="text-white">
                                                    <option value="">--- Select ---</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/3 p-10 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Status<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-3/4 pt-10 pb-0.5">
                                                <select className="text-white">
                                                    <option value="">--- Select ---</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <th scope="col" className="w-1/3 p-10 pb-0.5 text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                            Progress<span className="ml-2 text-amber-500">*</span>
                                        </th>
                                        <td>
                                            <div className="w-3/4 pt-10 pb-0.5">
                                                <input
                                                    type="text"
                                                    placeholder="Input Latest Progress"
                                                    className="w-full pb-0.5 text-white focus:outline-none"/>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="flex justify-center items-center gap-4 mt-4">
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