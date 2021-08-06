import React from "react";
import { useRouter } from "next/router";

export default function orgId() {
  const router = useRouter();
  const Data = router.query.orgId || [];
  return (
    <div>
      {Data.map((data, index) => {
        return (
          <div>
            {index} {data}
          </div>
        );
      })}
    </div>
  );
}
