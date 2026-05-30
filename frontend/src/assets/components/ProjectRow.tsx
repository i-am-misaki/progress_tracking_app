import { useState } from "react";

import { DeleteIcon } from '../icons/DeleteIcon';
import { EditIcon } from '../icons/EditIcon';
import { SaveIcon } from '../icons/SaveIcon';
import { CancelIcon } from '../icons/CancelIcon';
import type { Project } from '../../types/project';
import { ProjectStatusList } from '../../types/status';
import { showToast } from './Toast';


// 行専用のコンポーネント
export const ProjectRow = ({ project, key }: { project: Project; key: string; }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const defaultEta = project.eta;
  const defaultStatus = project.status;
  const [eta, setEta] = useState(project.eta);
  const [status, setStatus] = useState(project.status);

  const paddingZero = (rawDateStr: string) => {
    if (!rawDateStr) return '';

    // 年月日に分割し、０埋めを行う
    const parts = rawDateStr.split('/');
    if (parts.length !== 3) return '';

    const [year, month, day] = parts;
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
  }


  const handleSave = () => {
    if (status == defaultStatus){
        if (eta == paddingZero(defaultEta) || eta == defaultEta) {
            const message = '変更がありません';
            const type = 'info';
            showToast({ message, type });
            return
        }
    }

    console.log('変更あり');



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
                    defaultValue={paddingZero(project.eta)}
                    onChange={(e) => setEta(e.target.value)}
                />
            ) : (
              <p className="pr-11 tracking-wide">
                {paddingZero(project.eta).replaceAll('-', '/')}
              </p>
            )}
        </td>
        {/* Status */}
        {/* 編集モードの場合はステータスを選択可能な要素に変更 */}
        <td className="w-40 p-2">
            {isEditMode ? (
                <select
                    defaultValue={project.status}
                    onChange={(e) => setStatus(e.target.value)}
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
                                onClick={handleSave}
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
