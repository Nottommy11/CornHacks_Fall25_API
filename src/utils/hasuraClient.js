import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const HASURA_URL = process.env.HASURA_URL;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

export async function queryHasura(query, variables = {}) {
    const res = await fetch(HASURA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
        },
        body: JSON.stringify({ query, variables }),
    });
    const data = await res.json();
    if (data.errors) {
        console.error(data.errors);
        throw new Error("Hasura query failed");
    }
    return data.data;
}
