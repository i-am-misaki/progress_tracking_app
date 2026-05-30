type UUID = string;



/**
 * 案件新規登録情報インターフェース
 *
 * @interface ProjectRegister
 * @property {string} project_name    - 案件名
 * @property {string} project_summary - 案件概要
 * @property {string} client          - クライアント名
 * @property {string | null} eta      - 納期
 * @property {UUID | null} pic        - 担当者
 * @property {string} status          - ステータス
 * @property {string} priority        - 優先度
 * @property {string} progress        - 進捗状況
 */
export interface ProjectRegister {
    project_name: string;
    project_summary: string;
    client: string;
    eta: string | null;
    pic: UUID | null;
    status: string;
    priority: string;
    progress: string;
}

/**
 * 案件一覧画面表示インターフェース
 *
 * @interface Project
 * @property {string} project_uuid    - 案件のUUID
 * @property {string} project_name    - 案件名
 * @property {string} client          - クライアント名
 * @property {string} eta             - 納期
 * @property {string} pic             - 担当者
 * @property {string} status          - 進捗状態
 * @property {string} latest_progress - 最新の進捗
 */
export interface Project {
    project_uuid: string;
    project_name: string;
    client: string;
    eta: string;
    pic: UUID;
    status: string;
    priority: string;
    latest_progress: string;
}


/**
 * 案件一覧画面にて行ごとの更新インターフェース
 *
 * @interface ProjectRowUpdate
 * @property {string} project_uuid    - 案件のUUID
 * @property {string} eta             - 納期
 * @property {string} status          - 進捗状態
 */
export interface ProjectRowUpdate {
    project_uuid: string;
    eta: string;
    status: string;
}
