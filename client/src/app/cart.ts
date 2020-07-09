export class Cart {
	constructor (
		public product_id: number,
		public product_name: string,
		public product_amount: number,
		public added_by: string
	)
	{}
}