import Head from "next/head";
import SearchHeader from "../components/SearchHeader";
import Response from "../Response"
import { useRouter } from "next/router";
import SearchResults from "../components/SearchResults";
import SearchFooter from "../components/SearchFooter";

function Search({ results }) {
  const router = useRouter();

  return (
    <div className="dark:bg-[#202124]" >
      <Head>
        <title>{router.query.term} - Google Search</title>
      </Head>

      {/* Header */}
      <SearchHeader />

      {/* Search Results */}
      <SearchResults results={results} />

      <SearchFooter />
    </div>
  );
}

export default Search;

export async function getServerSideProps(context) {
  const useDummyData = false;
  const startIndex = context.query.start || '0';

  const data = useDummyData
  ? Response
  : await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`
  ).then(response => response.json());

  // After the SERVER has rendered... pass the results to the client.
  return {
    props: {
      results: data
    }
  }
}