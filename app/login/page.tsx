import { login } from '../actions/login'
import SectionField from '../components/layouts/SectionField'

export default function Login() {
  return (
    <div className="flex flex-col p-6 h-screen bg-blue-100 overflow-hidden">
      <SectionField>
        <div className="mb-6">
          <h2>ログイン</h2>
        </div>
        <form>
          <div className="flex flex-col">
            <div>
              <div>
                <label htmlFor="email">Email:</label>
              </div>
              <input id="email" name="email" type="email" className="border" required />
            </div>
            <div>
              <div>
                <label htmlFor="password">Password:</label>
              </div>
              <input id="password" name="password" type="password" className="border" required />
            </div>
          </div>
          <button formAction={login} className="p-1 border bg-green-400">Log in</button>
        </form>
      </SectionField>
    </div>
  )
}