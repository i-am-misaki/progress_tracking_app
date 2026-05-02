import { useNavigate } from 'react-router-dom';

import { AddIcon } from '../assets/icons/AddIcon';
import { EditIcon } from '../assets/icons/EditIcon';
import { DeleteIcon } from '../assets/icons/DeleteIcon';




export default function ProjectProgressList() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen">
            <div className="flex justify-end">
                <button type="button" className="border border-white text-white py-2 px-8 my-6 mx-8 cursor-pointer hover:bg-white transition-colors">
                    <span className="text-base" style={{ fontFamily: "'Changa', sans-serif" }}>Logout</span>
                </button>
            </div>
            <div className="flex justify-center items-end">
                <div className="w-full min-h-[750px] rounded-md inset-shadow-md inset-shadow-white-500/50 bg-white/30 backdrop-blur-xl mx-4 py-6 px-3">
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col text-center">
                            <h1 className="text-3xl font-bold" style={{ fontFamily: "'Changa', sans-serif" }}>Project Progress List</h1>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="group flex justify-center gap-2 items-center border border-white rounded-full text-white py-2 px-4 mx-8 cursor-pointer hover:text-black hover:bg-white transition-colors"
                                onClick={() => navigate('/project/register')}
                                >
                                <AddIcon></AddIcon>
                                <span className="text-base" style={{ fontFamily: "'Changa', sans-serif" }}>Project</span>
                            </button>
                        </div>
                        <div className="max-h-[550px] overflow-y-auto overflow-x-auto w-full px-4">
                            <table className="w-full table-auto border-collapse">
                                <thead className="sticky top-0 z-10 bg-gray-400">
                                    <tr className="text-xl text-left" style={{ fontFamily: "'Changa', sans-serif" }}>
                                        <th className="w-64 p-2 shadow-[inset_0_-2px_0_0_#000000]">
                                            <p>Project Name</p>
                                        </th>
                                        <th className="w-40 p-2 shadow-[inset_0_-2px_0_0_#000000]">
                                            <p>Client</p>
                                        </th>
                                        <th className="w-32 p-2 shadow-[inset_0_-2px_0_0_#000000]">
                                            <p>ETA</p>
                                        </th>
                                        <th className="w-40 p-2 shadow-[inset_0_-2px_0_0_#000000]">
                                            <p>Status</p>
                                        </th>
                                        <th className="p-2 shadow-[inset_0_-2px_0_0_#000000]">
                                            <p>Latest Progress</p>
                                        </th>
                                        <th className="w-40 p-2 shadow-[inset_0_-2px_0_0_#000000]">
                                            {/* 編集/削除 ボタン表示列 */}
                                            <p></p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-400/50">
                                    <tr className="border-b border-slate-200">
                                        <td className="w-64 p-2">
                                            <p>案件名</p>
                                        </td>
                                        <td className="w-40 p-2">
                                            <p>依頼元</p>
                                        </td>
                                        <td className="w-32 p-2">
                                            <p>2026/7/7</p>
                                        </td>
                                        <td className="w-40 p-2">
                                            <p>IN PROGRESS</p>
                                        </td>
                                        <td className="p-2">
                                            <p>コーディング中</p>
                                        </td>
                                        <td className="w-40 p-2">
                                            <div className="flex justify-center items-center gap-3" style={{ fontFamily: "'Changa', sans-serif" }}>
                                                <button type="button"
                                                        className=" text-white py-1 px-2 cursor-pointer transition-colors hover:text-amber-400"
                                                    >
                                                    <EditIcon />
                                                </button>
                                                <button type="button"
                                                        className=" text-white py-1 px-2 cursor-pointer transition-colors hover:text-amber-400"
                                                    >
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
