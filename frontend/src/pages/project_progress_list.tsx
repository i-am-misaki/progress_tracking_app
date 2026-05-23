import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

import { AddIcon } from '../assets/icons/AddIcon';
import type { Project } from '../types/project';
import { ProjectsTable } from '../assets/components/ProjectsTable';




export default function ProjectProgressList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    // 読み込み状態管理
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/member/projects')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`サーバーエラー: ${res.status}`)
                }
                return res.json();
            })
            .then(data => setProjects(data)
            )
            .catch(err => console.error('案件一覧の取得に失敗: ', err))
            .finally(() => setIsLoading(false))
    }, []);


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
                        { isLoading ? (
                                <p className="text-white text-center">Loading...</p>
                            ) : projects && projects.length > 0 ? (
                                <div className="max-h-[550px] overflow-y-auto overflow-x-auto w-full px-4">
                                    <ProjectsTable projects={projects} />
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center py-20 bg-gray-400/50 rounded-md mx-4">
                                    <p className="text-xl text-black/90" style={{ fontFamily: "'Changa', sans-serif" }}>
                                        No data available.
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
