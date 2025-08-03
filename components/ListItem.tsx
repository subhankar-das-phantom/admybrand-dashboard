import React from "react";
import Link from "next/link";

import { User } from "../interfaces";

type Props = {
  data: User;
};

const ListItem = ({ data }: Props) => (
  <Link href="/users/[id]" as={`/users/${data.id}`} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{data.name}</h3>
    <p className="text-gray-600">ID: <span className="font-medium text-gray-700">{data.id}</span></p>
  </Link>
);

export default ListItem;
