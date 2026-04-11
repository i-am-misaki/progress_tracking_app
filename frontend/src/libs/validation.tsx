import {
    EMPTY_MSG, INVALID_EMAIL_MSG,
    UNEXIST_EMAIL_MSG, EMAIL_MAX_LENGTH_MSG,
    SHORT_PASSWORD_MSG, LONG_PASSWORD_MSG
} from "../configs/validation_messages";
import {
    EMAIL_MAX_LENGTH, PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH, EMAIL_REGEX
} from "../configs/validation_settings";


/**
 * メッセージ内の<文字数>を指定された文字数に置換する関数
 * 
 * @param message {string} - 置換するメッセージ
 * @param count {number} - 置換する文字数
 * @returns {string} - 置換後のメッセージ
 */
function replaceWordCount(message: string, count: number): string {
    return message.replace("{文字数}", count.toString());
}   


/**
 * 値が空かどうかを判定するバリデーション
 * 
 * @param value {string} - 判定する値
 * @returns {isValid: boolean, message: string} - 空の場合は、isValid: falseとエラーメッセージを返す。
 *                                                  空でない場合は、isValid: trueと空のメッセージを返す。
 */
export function IsEmpty(value: string): { isValid: boolean; message: string } {
    if (!value){
        return { isValid: false, message: EMPTY_MSG };
    }
    return { isValid: true, message: ''};
}


/**
 * メールアドレスの形式が正しいかを判定するバリデーション
 * 
 * @param email {string} - 判定対象メールアドレス
 * @returns {isValid: boolean, message: string} - メールアドレスが有効な場合は、isValid: trueと空のメッセージを返す。
 *                                                  無効な場合は、isValid: falseとエラーメッセージを返す。
 */
export function EmailValidation(email: string): { isValid: boolean; message: string } {
    if (!IsEmpty(email).isValid) {
        return { isValid: false, message: EMPTY_MSG };
    }

    if (!EMAIL_REGEX.test(email)) {
        return { isValid: false, message: INVALID_EMAIL_MSG };
    }

    if (email.length > EMAIL_MAX_LENGTH) {
        const message = replaceWordCount(EMAIL_MAX_LENGTH_MSG, EMAIL_MAX_LENGTH);
        return { isValid: false, message: message };
    }
    //　ここで、メールアドレスの存在確認を行う 
    return { isValid: true, message: '' };
}


/**
 * パスワードの形式が正しいかを判定するバリデーション
 * 
 * @param password {string} - 判定対象パスワード
 * @returns {isValid: boolean, message: string} - メールアドレスが有効な場合は、isValid: trueと空のメッセージを返す。
 *                                                  無効な場合は、isValid: falseとエラーメッセージを返す。
 */
export function PasswordValidation(password: string): { isValid: boolean; message: string } {
    if (!IsEmpty(password).isValid) {
        return { isValid: false, message: EMPTY_MSG };
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
        const message = replaceWordCount(SHORT_PASSWORD_MSG, PASSWORD_MIN_LENGTH);
        return { isValid: false, message: message };
    }

    if (password.length > PASSWORD_MAX_LENGTH) {
        const message = replaceWordCount(LONG_PASSWORD_MSG, PASSWORD_MAX_LENGTH);
        return { isValid: false, message: message };
    }

    return { isValid: true, message: '' };
}
