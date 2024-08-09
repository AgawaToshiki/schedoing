import { login } from '../actions/login'

export default function Login() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login} className="p-1 border bg-green-400">Log in</button>
    </form>
  )
}