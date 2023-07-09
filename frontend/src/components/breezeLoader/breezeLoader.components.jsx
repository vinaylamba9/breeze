const BreezeLoader = ({ isLoading, children }) => {
	return <div>{isLoading ? <h1>Loading...</h1> : children}</div>;
};

export default BreezeLoader;
