"use client";

import { useParams } from "next/navigation";
import React from "react";

function Page() {
  const params = useParams();
  return <div>Detail Page {params.id}</div>;
}

export default Page;
