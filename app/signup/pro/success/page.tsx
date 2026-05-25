import { Suspense } from "react"
import SignupProSuccessContent from "./SignupProSuccessContent"

export default function SignupProSuccessPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SignupProSuccessContent />
    </Suspense>
  )
}

function LoadingScreen() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-10 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-500 animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Validation en cours</h1>
      </div>
    </main>
  )
}