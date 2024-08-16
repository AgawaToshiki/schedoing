import { login } from '../actions/login'

export default function Login() {
  return (
    <div className="flex flex-col w-full h-screen bg-blue-100 overflow-hidden">
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login} className="p-1 border bg-green-400">Log in</button>
      </form>
    </div>
  )
}