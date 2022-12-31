export interface ServerToClientEvents {
	presentCount: (count: number) => void
	mealServed: (meal: number) => void
	beneficiaryCount: (count: number) => void
}

// client application can emit these function to get a web socket response
export interface ClientToServerEvents {
	getPresentCount: () => void
	getMealServed: () => void
	getBeneficiaryCount: () => void
}

export interface InterServerEvents {
}

export interface SocketData {
}
