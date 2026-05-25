import { Suspense } from "react"
import SignupProSuccessContent from "./SignupProSuccessContent"

function LoadingScreen() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800">
          Finalisation en cours
        </h1>
        <p className="text-slate-500 mt-3">Chargement...</p>
      </div>
    </main>
  )
}

export default function SignupProSuccessPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SignupProSuccessContent />
    </Suspense>
  )
}