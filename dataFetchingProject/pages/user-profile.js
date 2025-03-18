import React from "react";

const UserProfile = (props) => {
  return <h1>{props.userName}</h1>;
};

export default UserProfile;

export async function getServerSideProps(context) {
  //   console.log("context", context);
  const { params, req, res } = context;
  console.log("req", req);
  console.log("res", res);
  return {
    props: {
      userName: "Max",
    },
  };
}
