export class User {
	constructor(
		public id: number,
		public name: string,
		public email: string,
		public mobile: string,
		public password: string,
		public cfpassword: string,
		public registered_at: string,
		public logged_in_at: string,
		public logged_out_at: string,
		public user_role: string,
		public added_by: string
	) {

	}
}