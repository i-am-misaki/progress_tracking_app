
import type { Project } from '../../types/project';
import { ProjectRow } from './ProjectRow';


export const ProjectsTable = ({ projects }: { projects: Project[]}) => {


  return (
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
            { projects.map((project) =>
                <ProjectRow
                    project={project}
                />
            )}
        </tbody>
    </table>
  );
};