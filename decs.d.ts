declare module "react-identicons";
declare module "react-remarkable";
declare module "next-swagger-doc";
declare module "leo-profanity";
declare module "@fluree/crypto-utils" {
	export function generateKeyPair(): {
		privateKey: string;
		publicKey: string;
	};
	export function getSinFromPublicKey(publicKey: string): string;
}
declare module "/lib/db/flureenjs.cjs" {
	type LedgerName = string;

	type Conn = object;

	type Db = object;

	type ServerString = string;

	type KeepAliveFn = () => void;

	type QueryOpts = object;

	type Results = string | number;

	type ResultsObject<T = {}> = T & Record<string, unknown>;

	type ConnOptions = {
		keepAlive?: boolean;
		"keep-alive-fn"?: KeepAliveFn;
	};

	type BaseQuery = {
		from?: string | string[] | number;
		where?: string | string[] | string[][] | object;
		block?: number | string;
		prefixes?: object;
		vars?: object;
		opts?: object;
	};

	type SelectQuery = BaseQuery & { select: string | string[] | object };

	type SelectOneQuery = BaseQuery & { selectOne: string | string[] | object };

	type Query = SelectQuery | SelectOneQuery;

	type MultiQuery<T> = {
		[T: string]: Query;
	};

	type BlockQuery = {
		block: number | number[];
	};

	type TransactionArray = Array<Record<string | unknown>>;

	type TxResultsObject<TI> = {
		tempids: TI;
		block: number;
		hash: string;
		instant: number;
		duration: string;
		fuel: number;
		auth: string;
		status: number;
		id: string;
	};

	export function db(conn: Conn, ledger: LedgerName): Promise<Db>;

	export function connect(
		server: ServerString,
		opts: ConnOptions
	): Promise<Conn>;

	export function query(
		db: Db,
		query: Query,
		options?: QueryOpts
	): Results | ResultsObject | Results[] | ResultsObject[];

	export function passwordLogin(
		conn: Conn,
		ledger: LedgerName,
		pwd: string,
		user: string,
		expire?: number
	): Promise<string>;

	export function multiQuery(
		db: Db,
		query: MultiQuery,
		options?: QueryOpts
	): ResultsObject;

	export function setLogging({ level: string });

	export function transact(
		conn: Conn,
		ledger: LedgerName,
		txArray: TransactionArray,
		opts?: object
	): Promise<TxResultsObject>;

	export function newLedger(
		conn: Conn,
		ledger: LedgerName,
		opts?: object
	): Promise<ResultsObject>;

	export function passwordGenerate(
		conn: Conn,
		ledger: LedgerName,
		password: string,
		username: string,
		opts?: object
	): Promise<ResultsObject>;

	export function blockQuery(
		conn: Conn,
		ledger: LedgerName,
		queryMap: BlockQuery,
		opts?: object
	);

	export {
		QueryOpts,
		Results,
		Conn,
		Db,
		ConnOptions,
		ServerString,
		LedgerName,
		Query,
		MultiQuery,
		TransactionArray,
		ResultsObject,
		TxResultsObject,
	};
}
