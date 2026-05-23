
import { DeleteIcon } from '../icons/DeleteIcon';
import type { Project } from '../../types/project';

// 行専用のコンポーネント
export const ProjectRow = ({ project }: { project: Project; }) => {

  return (
    <tr className="border-b border-slate-200">
        <td className="w-64 p-2">
            <p>{project.project_name}</p>
        </td>
        <td className="w-40 p-2">
            <p>{project.client}</p>
        </td>
        <td className="w-32 p-2">
            <p >{project.eta}</p>
        </td>
        <td className="w-40 p-2">
            <p>{project.status.toUpperCase().replace('_', ' ')}</p>
        </td>
        <td className="p-2">
            <p>{project.latest_progress}</p>
        </td>
        <td className="w-[40px] p-2">
            <div className="flex justify-end items-center" style={{ fontFamily: "'Changa', sans-serif" }}>
                <button type="button"
                        className=" text-white cursor-pointer transition-colors hover:text-black"
                    >
                    <DeleteIcon />
                </button>
            </div>
        </td>
    </tr>
  );
};
