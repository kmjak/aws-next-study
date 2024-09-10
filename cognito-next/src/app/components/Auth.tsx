"use client"

import { useState } from "react"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

export const AuthComponent = () => {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  return(
    <>
      {authMode === "login" ? (
        <>
          <LoginForm />
          <button
          className="text-blue-500"
          onClick={() => setAuthMode("signup")}
        >
          サインアップ
        </button>
      </>
      ) : (
        <>
        <SignupForm />
          <button
          className="text-blue-500"
          onClick={() => setAuthMode("login")}
        >
          ログイン
        </button>
      </>
      )}
    </>
  )
}