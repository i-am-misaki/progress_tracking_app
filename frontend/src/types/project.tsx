/**
 * 案件情報インターフェース
 *
 * @interface Project
 * @property {string} project_name    - 案件名
 * @property {string} project_summary - 案件概要
 * @property {string} client          - クライアント名
 * @property {string | null} eta      - 納期
 * @property {UUID | null} pic        - 担当者
 * @property {string} status          - ステータス
 * @property {string} priority        - 優先度
 * @property {string} progress        - 進捗状況
 */

type UUID = string;
export interface Project {
    project_name: string;
    project_summary: string;
    client: string;
    eta: string | null;
    pic: UUID | null;
    status: string;
    priority: string;
    progress: string;
}
