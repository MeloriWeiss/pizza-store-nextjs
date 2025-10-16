interface Params {
	description: string;
	orderId: number;
	amount: number;
}

export async function createPayment(details: Params) {
	try {
		const data = await fetch('https://api.yookassa.ru/v3/payments', {
			method: 'POST',
			body: JSON.stringify({
				amount: {
					value: String(details.amount),
					currency: 'RUB'
				},
				capture: true,
				description: details.description,
				metadata: {
					order_id: details.orderId,
				},
				confirmation: {
					type: 'redirect',
					return_url: process.env.BASE_URL + '?paid'
				}
			}),
			headers: {
				'Content-Type': 'application/json',
				'Idempotence-Key': crypto.randomUUID(),
				'Authorization': `Basic ${btoa(process.env.YOOKASSA_STORE_ID + ':' + process.env.YOOKASSA_API_KEY)}`
			}
		});
		return await data.json();
	} catch (error) {
		throw new Error('[CreatePayment] server error', error);
	}

	// const {data} = await axios.post<PaymentData>('https://api.yookassa.ru/v3/payments', {
	// 	amount: {
	// 		value: String(details.amount),
	// 		currency: 'RUB'
	// 	},
	// 	capture: true,
	// 	description: details.description,
	// 	metadata: {
	// 		order_id: details.orderId,
	// 	},
	// 	confirmation: {
	// 		type: 'redirect',
	// 		return_url: process.env.BASE_URL + '?paid'
	// 	}
	// }, {
	// 	auth: {
	// 		username: process.env.YOOKASSA_STORE_ID as string,
	// 		password: process.env.YOOMONEY_API_KEY as string,
	// 	},
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'Idempotence-Key': crypto.randomUUID(),
	// 	}
	// });
	// return data;
}