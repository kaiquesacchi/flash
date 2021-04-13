import { useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import React from "react";
import { APOLLO_STATE_PROP_NAME, initializeApollo } from "../../lib/apolloClient";
import { GET_ALL_COMPANIES, iGetAllCompanies } from "../graphql/queries/company";

export default function Home() {
  const { data, error } = useQuery<iGetAllCompanies>(GET_ALL_COMPANIES);
  return (
    <div>
      <h1>Home Page</h1>
      <pre>
        <code>{JSON.stringify(data?.getAllCompanies)}</code>
      </pre>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = initializeApollo();
  try {
    await apolloClient.query<iGetAllCompanies>({
      query: GET_ALL_COMPANIES,
    });
  } catch {}
  return {
    props: { [APOLLO_STATE_PROP_NAME]: apolloClient.cache.extract() },
  };
};
