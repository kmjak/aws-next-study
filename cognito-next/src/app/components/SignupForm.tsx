import { useState } from "react";
import { confirmSignUpUser, signup } from "../servicces/cognito/signup";

export const SignupForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isComfirm, setIsComfirm] = useState<boolean | null>(null);
  const [confirmCode, setConfirmCode] = useState<string>("");
  const handleSignup = async () => {
    const res = await signup(username, email, password);
    if(res?.UserConfirmed != undefined){
      setIsComfirm(res.UserConfirmed);
    }
  }
  const handleConfirmCode = async () => {
    confirmSignUpUser(username, confirmCode);
  }
  return(
    <div className="flex flex-col justify-center min-h-5/6">
      {isComfirm === null && (
        <>
          <h2 className="text-4xl font-bold text-center">サインアップ</h2>
          <div className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                ユーザーネーム
              </label>
              <input
                type="text"
                placeholder="kmjak"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                メールアドレス
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                パスワード
              </label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              onClick={handleSignup}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              サインアップ
            </button>
          </div>
        </>
        )}
        {isComfirm === false && (
          <>
            <h2 className="text-4xl font-bold text-center">確認コードを入力してください</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                code
              </label>
              <input
                type="text"
                placeholder="123456"
                value={confirmCode}
                onChange={(e) => setConfirmCode(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              onClick={handleConfirmCode}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              confirm
            </button>
          </>
        )}
    </div>
  )
}