export interface CreateVandorInput {
	name: string;
	ownerName: string;
	foodType: [string];
	pincode: string;
	address: string;
	phone: string;
	email: string;
	password: string;
}

export interface VandorLoginInput {
	email: string;
	password: string;
}

export interface VandorPayload {
	_id: string;
	email: string;
	name: string;
	foodType: [string];
}

export interface VandorEditInput {
	name: string;
	address: string;
	phone: string;
	foodType: [string];
}
