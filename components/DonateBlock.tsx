import { useRouter } from "next/dist/client/router";
import { useState } from "react";

import { PaystackButton } from "react-paystack";

const DonateBlock: React.FunctionComponent = () => {
	const router = useRouter();
	type Currency = "NGN" | "GHS" | "USD" | "ZAR";

	type returnCurrency = (currency: string) => Currency;
	let returnCurrency: returnCurrency = (currency) => {
		switch (currency) {
			case "NGN":
				return "NGN";
			case "GHS":
				return "GHS";
			case "USD":
				return "USD";
			case "ZAR":
				return "ZAR";
			default:
				return "NGN";
		}
	};

	const [email, setEmail] = useState("");
	const [amount, setAmount] = useState(0);
	const [currency, setCurrency] = useState("USD");

	const handlePaystackSuccessAction = (reference: string) => {
		router.push("/donate-complete");
		console.log("Payment complete! Reference: " + reference);
	};

	const paystackConfig = {
		publicKey: "pk_test_50988ea6de4aa7a346924072a1d5974c42a88bbd",
		reference: new Date().getTime().toString(),
		onSuccess: (reference: string) =>
			handlePaystackSuccessAction(reference),
		onClose: () => {
			console.log("Closed payment window");
		},
	};

	return (
		<div className="card border-0" style={{ width: "24rem" }}>
			<h1 className="card-title display-4 text-center text-secondary">
				Donate today!
			</h1>
			<form
				className="card-body"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className="mb-3">
					<label htmlFor="email-input" className="form-label">
						Email:
					</label>
					<div className="input-group">
						<input
							type="email"
							name="email-input"
							id="emailAddress"
							required
							className="form-control"
							placeholder="janedoe@acme.com"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div className="invalid-feedback">
							Please enter a valid email
						</div>
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="amount" className="form-label">
						Amount:
					</label>
					<div className="input-group has-validation">
						<span
							className="input-group-text text-primary border-primary border-end-0"
							id="donate-amount"
						>
							{currency}
						</span>

						<input
							type="number"
							name="amount"
							id="amount"
							required
							className="form-control border-primary"
							placeholder="Enter your amount here..."
							aria-label="Amount"
							aria-describedby="donate-amount"
							onChange={(e) =>
								setAmount(e.target.value as unknown as number)
							}
						/>
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="currency" className="form-label">
						Currency:
					</label>
					<select
						className="form-select"
						onChange={(e) => setCurrency(e.target.value)}
						value={currency}
					>
						<option value="USD">USD</option>
						<option value="ZAR">ZAR</option>
						<option value="GHS">GHS</option>
						<option value="NGN">NGN</option>
					</select>
				</div>
				<PaystackButton
					publicKey={paystackConfig.publicKey}
					email={email}
					amount={amount * 100}
					currency={returnCurrency(currency)}
					text="Donate"
					onSuccess={paystackConfig.onSuccess}
					onClose={() => {
						console.log("Closed payment window");
					}}
					className="btn btn-primary text-white w-50"
				/>
				1
			</form>
		</div>
	);
};

export default DonateBlock;
