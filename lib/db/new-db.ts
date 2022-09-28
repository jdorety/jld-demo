import flureenjs from "./flureenjs.cjs"
import { connectToFluree } from "./conn";
export async function newDb(
	network: string,
	ledger: string
): Promise<flureenjs.ResultsObject> {
	let results = {};
	try {
		const conn = await connectToFluree();
		const ledgerName = `${network}/${ledger}`;
		const opts = {};
		results = await flureenjs.newLedger(conn, ledgerName);
		console.debug(results);
	} catch (err) {
		console.error(err);
	}

	return results;
}
