import { AddIcon } from '../assets/icons/AddIcon';



export default function ProjectProgressList() {
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
                            <h1 className="text-2xl font-bold">Project Progress List</h1>
                        </div>
                        <div className="flex justify-end">
                            <button type="button" className="group flex justify-center gap-2 items-center border border-white rounded-full text-white py-2 px-4 mx-8 cursor-pointer hover:text-black hover:bg-white transition-colors">
                                <AddIcon></AddIcon>
                                <span className="text-base" style={{ fontFamily: "'Changa', sans-serif" }}>Project</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
