import React from 'react'
import { getAllUser } from '../utils/supabase/supabaseFunctions';
import EditUserButton from '../components/EditUserButton';
import DeleteUserButton from '../components/DeleteUserButton';

const AdminUserList = async() => {
	const data = await getAllUser();

  return (
		<>
			{/* <div className="max-w-[800px] flex bg-white overflow-y-auto">
				<div className="flex-grow overflow-x-auto">
					<table className="w-full border-collapse">
						<thead>
							<tr className="h-14 border border-r-0">
								<th className="min-w-[150px] px-4 py-2 border text-left whitespace-nowrap">権限</th>
								<th className="min-w-[250px] px-4 py-2 border text-left whitespace-nowrap">ユーザー名</th>
								<th className="min-w-[250px] px-4 py-2 border border-r-0 text-left whitespace-nowrap">メールアドレス</th>
							</tr>
						</thead>
						<tbody>
							{data?.map((user) => (
								<tr key={user.id} className="h-14 border border-r-0">
									<td className="px-4 py-2 border whitespace-nowrap">{user.role}</td>
									<td className="px-4 py-2 border whitespace-nowrap">{user.displayName}</td>
									<td className="px-4 py-2 border border-r-0 whitespace-nowrap">{user.email}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="flex-shrink-0 max-w-[150px]">
					<table className="w-full border-collapse">
						<thead>
							<tr className="h-14 border">
								<th className="px-4 py-2 border text-left whitespace-nowrap"></th>
							</tr>
						</thead>
						<tbody>
							{data?.map((user) => (
								<tr key={user.id} className="h-14 border">
									<td className="px-4 py-2 whitespace-nowrap">
										<div className="flex gap-1.5">
											<EditUserButton user={user} />
											<DeleteUserButton id={user.id} />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div> */}
			        <div className="max-w-[800px] h-full flex bg-white">
          <div className="flex-grow overflow-x-auto h-full overflow-y-scroll">
            <table className="w-full h-[200%] border border-collapse">
              <thead>
                <tr className="">
                  <th className="
                  sticky top-0 z-20 min-w-[150px] px-4 py-2 bg-gray-100 border text-left whitespace-nowrap
                  before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                  ">
                    権限
                  </th>
                  <th className="
                  sticky top-0 z-20 min-w-[250px] px-4 py-2 bg-gray-100 border text-left whitespace-nowrap
                  before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                  ">
                    ユーザー名
                  </th>
                  <th className="
                  sticky top-0 z-20 min-w-[250px] px-4 py-2 bg-gray-100 border text-left whitespace-nowrap
                  before:absolute before:top-[-1px] before:left-[-1px] before:w-full before:h-full before:border-t
                  ">
                    メールアドレス
                  </th>
                  <th className="
                  sticky top-0 right-0 z-20 min-w-[150px] px-4 py-2 bg-gray-100 border text-left whitespace-nowrap
                  before:absolute before:top-[-1px] before:right-[-1px] before:w-full before:h-full before:border-t before:border-r
                  ">
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((user) => (
                  <tr key={user.id} className="">
                    <td className="px-4 py-2 border whitespace-nowrap">{user.role}</td>
                    <td className="px-4 py-2 border whitespace-nowrap">{user.displayName}</td>
                    <td className="px-4 py-2 border whitespace-nowrap">{user.email}</td>
                    <td className="
                    sticky right-0 z-10 px-4 py-2 border bg-white whitespace-nowrap
                    before:absolute before:z-10 before:top-[-1px] before:right-[-1px] before:w-full before:h-full before:border-r
                    ">
                      <div className="relative z-50 flex justify-center items-center gap-2">
                        <EditUserButton user={user} />
                        <DeleteUserButton id={user.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
		</>
  )
}

export default AdminUserList