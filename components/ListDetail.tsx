import * as React from "react";

import { User } from "../interfaces";

type ListDetailProps = {
  item: User;
};

const ListDetail = ({ item: user }: ListDetailProps) => (
  <div className="bg-white p-8 rounded-lg shadow-xl">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">User: {user.name}</h1>
    <p className="text-lg text-gray-700">ID: <span className="font-semibold text-blue-600">{user.id}</span></p>
  </div>
);

export default ListDetail;
