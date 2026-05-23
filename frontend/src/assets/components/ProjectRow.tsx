import { useState } from "react";

import { DeleteIcon } from '../icons/DeleteIcon';
import { EditIcon } from '../icons/EditIcon';
import { SaveIcon } from '../icons/SaveIcon';
import { CancelIcon } from '../icons/CancelIcon';
import type { Project } from '../../types/project';
import { ProjectStatusList } from '../../types/status';

// 行専用のコンポーネント
export const ProjectRow = ({ project, key }: { project: Project; key: string; }) => {
  const [isEditMode, setIsEditMode] = useState(false);



  const handleStatusChange = (value: string) => {
    console.log('Status changed to: ', value);
    // ここでAPIに変更を送る処理を実装する
  }

  return (
    <tr className="border-b border-slate-200">
        <td className="w-64 p-2">
            <p>{project.project_name}</p>
        </td>
        <td className="w-40 p-2">
            <p>{project.client}</p>
        </td>
        {/* ETA */}
        {/* 編集モードの場合は年月日を選択可能な要素に変更 */}
        <td className="w-32 p-2">
            {isEditMode ? (
                <input
                    type="date"
                    defaultValue={project.eta}
                />
            ) : (
              <p >{project.eta}</p>
            )}
        </td>
        {/* Status */}
        {/* 編集モードの場合はステータスを選択可能な要素に変更 */}
        <td className="w-40 p-2">
            {isEditMode ? (
                <select
                    defaultValue={project.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                >
                    {ProjectStatusList.map((status) => (
                        <option key={status} value={status}>
                            {status.toUpperCase().replace('_', ' ')}
                        </option>
                    ))}
                </select>
            ) : (
                <p>{project.status.toUpperCase().replace('_', ' ')}</p>
            )}
        </td>
        <td className="p-2">
            <p>{project.latest_progress}</p>
        </td>
        <td className="w-[40px] p-2">
                {isEditMode ? (
                    <div className="flex justify-end items-center gap-3">
                        <button type="button"
                                className="text-white cursor-pointer transition-colors hover:text-black"
                                >
                            <SaveIcon />
                        </button>
                        <button type="button"
                                onClick={() => setIsEditMode(false)}
                                className="text-white cursor-pointer transition-colors hover:text-black"
                        >
                            <CancelIcon />
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-end items-center gap-3">
                        <button type="button"
                                onClick={() => setIsEditMode(true)}
                                className="text-white cursor-pointer transition-colors hover:text-black"
                            >
                            <EditIcon  />
                        </button>
                        <button type="button"
                                className="text-white cursor-pointer transition-colors hover:text-black"
                            >
                            <DeleteIcon />
                        </button>
                    </div>
                )}
        </td>
    </tr>
  );
};
