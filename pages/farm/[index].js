import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import { useRouter } from "next/router";

export default function farm() {
  const router = useRouter();
  const Data = router.query;
  const index = parseInt(Data.index) - 1;
  var farm = [
    {
      name: "Farm1",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "yes",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Farm2",
      node: ["Node1", "Node2", "Node3"],
      numnode: "3",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Farm3",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "yes",
      blockchain: "yes",
      created: "2021-04-29",
    },
    {
      name: "Farm4",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "no",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
  ];

  return <div>{}</div>;
}

farm.Layout = Layout;
